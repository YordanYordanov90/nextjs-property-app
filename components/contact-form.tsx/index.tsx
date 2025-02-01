"use client"
import { useFormState, useFormStatus } from 'react-dom';
import ShareButtons from './share-buttons';
import { PropertyProps } from '../property-card';
import { sendMessage } from '@/actions/message';
import { toast } from '@/hooks/use-toast';

// Submit Button Component with loading state
const SubmitButton = () => {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit"
      disabled={pending}
      className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white py-3 rounded-lg transition-colors"
    >
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
};

const initialState = {
  message: '',
  success: false,
};

const ContactForm = ({ property }: PropertyProps) => {
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    try {
      const result = await sendMessage(
        property.id,
        formData.get('name') as string,
        formData.get('email') as string,
        formData.get('phone') as string || undefined,
        formData.get('body') as string
      );

      if (result.success) {
        toast({
          className: "bg-blue-500 text-white",
          title: "Success!",
          description: "Your message has been sent.",
          variant: "default",
        });
        return { message: 'Success', success: true };
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
      return { message: 'Error sending message', success: false };
    }
  }, initialState);

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 p-6 rounded-xl top-6">
        <h3 className="text-xl font-bold mb-6 text-blue-500">
          Contact Owner
        </h3>
        <form action={formAction} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone (Optional)"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors"
          />
          <textarea
            name="body"
            placeholder="Your Message"
            rows={4}
            required
            className="w-full resize-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors"
          />
          <SubmitButton />
        </form>
      </div>

      <ShareButtons property={property} />
    </div>
  );
};

export default ContactForm;