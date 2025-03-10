
import { Card } from "@/components/ui/card";
import { MessageSquare, Phone, Mail, HelpCircle } from "lucide-react";

const CustomerSupport = () => {
  const supportOptions = [
    {
      title: "Chat with Support",
      description: "Get instant help from our customer support team.",
      icon: MessageSquare,
      action: "Start Chat",
      color: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Call Us",
      description: "Speak directly with a support representative.",
      icon: Phone,
      action: "Call Now",
      color: "bg-green-100",
      textColor: "text-green-600",
      details: "+1 (555) 123-4567",
      hours: "Mon-Fri, 9am-5pm ET",
    },
    {
      title: "Email Support",
      description: "Send us a message and we'll respond within 24 hours.",
      icon: Mail,
      action: "Send Email",
      color: "bg-purple-100",
      textColor: "text-purple-600",
      details: "support@company.com",
    },
  ];

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting the Orders section in your account dashboard and selecting the specific order you want to track."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. For enterprise customers, we also offer invoicing options with net-30 terms."
    },
    {
      question: "How can I request a return or refund?",
      answer: "To request a return or refund, please contact our support team within 30 days of receiving your order. We'll guide you through the process."
    },
    {
      question: "How do I update my shipping address?",
      answer: "You can update your shipping address in the Settings section of your account. Changes will apply to new orders only."
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Support Center</h1>
      <p className="text-secondary-foreground">Get help with your account and orders.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportOptions.map((option, index) => (
          <Card key={index} className="glass-card p-6">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: option.color }}>
              <option.icon className={`h-6 w-6 ${option.textColor}`} />
            </div>
            <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
            <p className="text-gray-500 mb-4">{option.description}</p>
            
            {option.details && (
              <p className={`font-medium ${option.textColor} mb-1`}>{option.details}</p>
            )}
            
            {option.hours && (
              <p className="text-sm text-gray-500 mb-4">{option.hours}</p>
            )}
            
            <button className={`w-full py-2 rounded-lg font-medium ${option.textColor} bg-opacity-20`} style={{ backgroundColor: option.color }}>
              {option.action}
            </button>
          </Card>
        ))}
      </div>

      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
              <h3 className="font-medium mb-2">{faq.question}</h3>
              <p className="text-gray-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CustomerSupport;
