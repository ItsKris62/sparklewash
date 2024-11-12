import ServiceCard from './ServiceCard';

const ServicesSection = ({ services, onCheckout, icons }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard 
          key={index} 
          service={service} 
          onCheckout={() => onCheckout(service)} 
          icon={icons[service.name]} // Pass the specific icon based on the service name
        />
      ))}
    </div>
  );
};

export default ServicesSection;
