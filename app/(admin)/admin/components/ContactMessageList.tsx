import { useState } from 'react';
import { createClient } from '@/lib/supabase';

// Define the message type
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status?: string;
  created_at: string;
}

// Add a function to update the message status
async function updateMessageStatus(messageId: string, newStatus: string) {
  const { data, error } = await createClient()
    .from('contact_messages')
    .update({ status: newStatus })
    .eq('id', messageId);
    
  if (error) {
    console.error('Error updating message status:', error);
    return false;
  }
  
  return true;
}

// In your message list component
interface ContactMessageListProps {
  messages: ContactMessage[];
  onRefresh: () => void;
}

export default function ContactMessageList({ messages, onRefresh }: ContactMessageListProps) {
  const [updating, setUpdating] = useState(false);
  
  const handleStatusChange = async (messageId: string, newStatus: string) => {
    setUpdating(true);
    const success = await updateMessageStatus(messageId, newStatus);
    if (success) {
      // Refresh the messages list
      onRefresh();
    }
    setUpdating(false);
  };
  
  return (
    <div className="space-y-4">
      {messages.map((message: ContactMessage) => (
        <div key={message.id} className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{message.name}</h3>
              <p className="text-sm text-gray-500">{message.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                message.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                message.status === 'read' ? 'bg-blue-100 text-blue-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {message.status || 'pending'}
              </span>
              <select
                value={message.status || 'pending'}
                onChange={(e) => handleStatusChange(message.id, e.target.value)}
                className="text-sm border rounded p-1"
                disabled={updating}
              >
                <option value="pending">Pending</option>
                <option value="read">Read</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <p className="mt-2">{message.message}</p>
          <div className="mt-2 text-xs text-gray-500">
            {new Date(message.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
} 