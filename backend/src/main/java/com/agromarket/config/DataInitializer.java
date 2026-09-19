package com.agromarket.config;

import com.agromarket.model.*;
import com.agromarket.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final AdvisoryQueryRepository advisoryRepository;
    private final NotificationRepository notificationRepository;

    public DataInitializer(UserRepository userRepository,
                           ProductRepository productRepository,
                           OrderRepository orderRepository,
                           AdvisoryQueryRepository advisoryRepository,
                           NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.advisoryRepository = advisoryRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // Data already initialized
        }

        // 1. Create Farmer
        User farmer = new User("Ramesh Kumar", "farmer@agromarket.com", "password123", "FARMER", "9876543210", "Coimbatore", "Tamil Nadu");
        farmer.setAddress("Green Acres Farm, Pollachi Road, Coimbatore");
        farmer.setUpiId("rameshfarmer@okaxis");
        farmer.setQrCodeUrl("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=rameshfarmer@okaxis%26pn=Ramesh%20Kumar%26cu=INR");
        farmer.setFarmSizeAcres(4.5);
        User savedFarmer = userRepository.save(farmer);

        // 2. Create Buyer
        User buyer = new User("Priya Sharma", "buyer@agromarket.com", "password123", "BUYER", "9876543211", "Coimbatore", "Tamil Nadu");
        buyer.setAddress("Flat 4B, Emerald Heights, RS Puram, Coimbatore");
        User savedBuyer = userRepository.save(buyer);

        // 3. Create Delivery Agent
        User deliveryAgent = new User("Suresh Verma", "delivery@agromarket.com", "password123", "DELIVERY", "9876543212", "Coimbatore", "Tamil Nadu");
        deliveryAgent.setAddress("Shop 12, Gandhipuram Cross Cut, Coimbatore");
        deliveryAgent.setVehicleType("Motorcycle");
        deliveryAgent.setVehicleNumber("TN 38 BX 4412");
        deliveryAgent.setBankAccountNo("109823485721");
        deliveryAgent.setBankIfsc("SBIN0001234");
        deliveryAgent.setBankName("State Bank of India");
        deliveryAgent.setIsAvailable(true);
        User savedDelivery = userRepository.save(deliveryAgent);

        // 4. Create Agricultural Advisory Expert
        User advisor = new User("Dr. Ananya Swaminathan", "advisor@agromarket.com", "password123", "ADVISORY", "9876543213", "Coimbatore", "Tamil Nadu");
        advisor.setAddress("Faculty of Agriculture, TNAU Campus, Coimbatore");
        advisor.setSpecialization("Crop Pathology & Organic Horticulture");
        advisor.setQualification("Ph.D. in Agronomy");
        userRepository.save(advisor);

        // 5. Create Initial Products
        Product p1 = new Product();
        p1.setFarmerId(savedFarmer.getId());
        p1.setFarmerName(savedFarmer.getFullName());
        p1.setName("Organic Country Tomatoes");
        p1.setCategory("Vegetables");
        p1.setPricePerUnit(35.00);
        p1.setUnit("kg");
        p1.setQuantityAvailable(50.0);
        p1.setDescription("Freshly picked vine-ripened red country tomatoes without toxic pesticides. Rich in Lycopene and natural sweetness.");
        p1.setImageUrl("https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80");
        p1.setDistrict("Coimbatore");
        productRepository.save(p1);

        Product p2 = new Product();
        p2.setFarmerId(savedFarmer.getId());
        p2.setFarmerName(savedFarmer.getFullName());
        p2.setName("Farm Fresh Green Chillies");
        p2.setCategory("Vegetables");
        p2.setPricePerUnit(45.00);
        p2.setUnit("kg");
        p2.setQuantityAvailable(20.0);
        p2.setDescription("Crisp, pungent, and freshly picked green chillies from the morning harvest.");
        p2.setImageUrl("https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80");
        p2.setDistrict("Coimbatore");
        productRepository.save(p2);

        Product p3 = new Product();
        p3.setFarmerId(savedFarmer.getId());
        p3.setFarmerName(savedFarmer.getFullName());
        p3.setName("Fresh Pollachi Tender Coconut");
        p3.setCategory("Fruits");
        p3.setPricePerUnit(50.00);
        p3.setUnit("piece");
        p3.setQuantityAvailable(40.0);
        p3.setDescription("Naturally sweet, cooling, and nutrient-dense tender coconuts harvested from our certified organic grove in Pollachi.");
        p3.setImageUrl("https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600&auto=format&fit=crop&q=80");
        p3.setDistrict("Coimbatore");
        productRepository.save(p3);

        Product p4 = new Product();
        p4.setFarmerId(savedFarmer.getId());
        p4.setFarmerName(savedFarmer.getFullName());
        p4.setName("Natural Pure Wild Honey");
        p4.setCategory("Organic Goods");
        p4.setPricePerUnit(320.00);
        p4.setUnit("bottle");
        p4.setQuantityAvailable(15.0);
        p4.setDescription("Raw, unprocessed forest wildflower honey extracted sustainably without artificial heating or added sugar.");
        p4.setImageUrl("https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80");
        p4.setDistrict("Coimbatore");
        productRepository.save(p4);

        Product p5 = new Product();
        p5.setFarmerId(savedFarmer.getId());
        p5.setFarmerName(savedFarmer.getFullName());
        p5.setName("Traditional Ponni Raw Rice");
        p5.setCategory("Grains & Pulses");
        p5.setPricePerUnit(65.00);
        p5.setUnit("kg");
        p5.setQuantityAvailable(100.0);
        p5.setDescription("Single-origin naturally grown Ponni rice, unpolished to retain vital B-vitamins and natural dietary fiber.");
        p5.setImageUrl("https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80");
        p5.setDistrict("Coimbatore");
        productRepository.save(p5);

        // 6. Create Sample Advisory Queries
        AdvisoryQuery q1 = new AdvisoryQuery();
        q1.setUserId(savedFarmer.getId());
        q1.setUserName(savedFarmer.getFullName());
        q1.setUserRole("FARMER");
        q1.setDistrict("Coimbatore");
        q1.setCropType("Tomato");
        q1.setSubject("Leaf Curling & Yellow Vein Clearing");
        q1.setQuestion("My hybrid tomato plants are showing slight upward leaf curl and yellow veins. Which organic pesticide is recommended?");
        q1.setStatus("ANSWERED");
        q1.setReply("This symptom indicates Tomato Leaf Curl Virus transmitted by whiteflies. Prepare an organic neem seed kernel extract (NSKE 5%) or spray pure cold-pressed neem oil (5ml/L water) with liquid soap emulsifier twice weekly. Also install yellow sticky traps.");
        q1.setRepliedById(advisor.getId());
        q1.setRepliedByName(advisor.getFullName());
        q1.setRepliedAt(LocalDateTime.now().minusDays(1));
        advisoryRepository.save(q1);

        AdvisoryQuery q2 = new AdvisoryQuery();
        q2.setUserId(savedBuyer.getId());
        q2.setUserName(savedBuyer.getFullName());
        q2.setUserRole("BUYER");
        q2.setDistrict("Coimbatore");
        q2.setCropType("Kitchen Garden");
        q2.setSubject("Coriander leaf germination in pots");
        q2.setQuestion("How often should I water coriander seeds in terrace pots during sunny afternoons to ensure good germination?");
        q2.setStatus("OPEN");
        advisoryRepository.save(q2);

        // 7. Create Sample Demo Order (demonstrating status flow, OTP, 70/30 split)
        Order sampleOrder = new Order();
        sampleOrder.setOrderNumber("ORD-881204-742");
        sampleOrder.setBuyerId(savedBuyer.getId());
        sampleOrder.setBuyerName(savedBuyer.getFullName());
        sampleOrder.setBuyerPhone(savedBuyer.getPhone());
        sampleOrder.setDeliveryAddress(savedBuyer.getAddress());
        sampleOrder.setBuyerDistrict("Coimbatore");

        sampleOrder.setFarmerId(savedFarmer.getId());
        sampleOrder.setFarmerName(savedFarmer.getFullName());
        sampleOrder.setFarmerPhone(savedFarmer.getPhone());
        sampleOrder.setFarmerUpiId(savedFarmer.getUpiId());
        sampleOrder.setFarmerQrCodeUrl(savedFarmer.getQrCodeUrl());
        sampleOrder.setFarmerDistrict("Coimbatore");

        sampleOrder.setDeliveryAgentId(savedDelivery.getId());
        sampleOrder.setDeliveryAgentName(savedDelivery.getFullName());
        sampleOrder.setDeliveryAgentPhone(savedDelivery.getPhone());

        sampleOrder.setProductTotal(210.00);
        sampleOrder.setGstAmount(10.50);
        sampleOrder.setDeliveryCharge(40.00);
        sampleOrder.setPlatformCharge(15.00);
        sampleOrder.setGrandTotal(275.50);

        // 70% to Farmer, 30% to Delivery Agent
        sampleOrder.setFarmerEarnings(147.00);
        sampleOrder.setDeliveryEarnings(63.00);

        sampleOrder.setPaymentMethod("UPI");
        sampleOrder.setPaymentStatus("COMPLETED");
        sampleOrder.setOrderStatus("ACCEPTED_BY_FARMER");
        sampleOrder.setDeliveryOtp("482910");

        sampleOrder.setFarmerMapsQuery("Green Acres Farm, Pollachi Road, Coimbatore");
        sampleOrder.setBuyerMapsQuery("Flat 4B, Emerald Heights, RS Puram, Coimbatore");

        sampleOrder.addItem(new OrderItem(p1.getId(), p1.getName(), 6.0, 35.0, 210.0));
        orderRepository.save(sampleOrder);

        // 8. Notifications
        notificationRepository.save(new Notification(savedFarmer.getId(), "Order Confirmed", "Order #" + sampleOrder.getOrderNumber() + " was confirmed. Delivery boy will arrive shortly."));
        notificationRepository.save(new Notification(savedBuyer.getId(), "Farmer Confirmed Your Order", "Farmer Ramesh Kumar confirmed your order #" + sampleOrder.getOrderNumber() + ". Your delivery OTP is 482910."));
        notificationRepository.save(new Notification(savedDelivery.getId(), "Pickup Ready", "Order #" + sampleOrder.getOrderNumber() + " is ready for pickup from Green Acres Farm."));

        System.out.println(">>> AgroMarket Sample Data Successfully Seeded! <<<");
    }
}
