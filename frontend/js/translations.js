/**
 * IFMAP / AgroMarket
 * Global Translation System
 *
 * Supported Languages:
 * en = English
 * hi = Hindi
 * ta = Tamil
 * te = Telugu
 */

const translations = {

    // ============================================================
    // ENGLISH
    // ============================================================
    en: {

        // ---------- COMMON ----------
        platform_name: "AgroMarket",
        logout: "Logout",
        login: "Login",
        register: "Register",
        save: "Save",
        cancel: "Cancel",
        close: "Close",
        submit: "Submit",
        confirm: "Confirm",
        delete: "Delete",
        remove: "Remove",
        edit: "Edit",
        update: "Update",
        search: "Search",
        filter: "Filter",
        loading: "Loading...",
        available: "Available",
        unavailable: "Unavailable",
        yes: "Yes",
        no: "No",
        back: "Back",
        next: "Next",
        previous: "Previous",
        refresh: "Refresh",
        view: "View",
        add: "Add",

        // ---------- ROLES ----------
        farmer: "Farmer",
        buyer: "Buyer",
        advisor: "Advisor",
        delivery_boy: "Delivery Boy",
        role_farmer: "Farmer",
        role_buyer: "Buyer",
        role_advisor: "Advisor",

        // ---------- NAVIGATION ----------
        home: "Home",
        dashboard: "Dashboard",
        marketplace: "Explore Produce",
        cart: "Cart",
        my_orders: "My Orders & Delivery OTP",
        orders: "Orders",
        profile: "Profile",
        settings: "Settings",
        advisory: "Plant Advisory",
        consult_advisory: "Consult Plant Advisory",

        // ---------- BUYER ----------
        buyer_portal: "Buyer Marketplace",
        buyer_description:
            "Buy farm-fresh vegetables, fruits, and grains directly from farmers in your district.",
        explore_produce: "Explore Produce",
        district: "District",
        category: "Category",
        all_categories: "All Categories",
        search_products: "Search products...",
        select_district: "Select District",
        select_category: "Select Category",
        product: "Product",
        products: "Products",
        price: "Price",
        quantity: "Quantity",
        unit: "Unit",
        stock: "Stock",
        in_stock: "In Stock",
        out_of_stock: "Out of Stock",
        sold_out: "Sold Out",
        farm_fresh_harvest: "Farm-fresh harvest",
        no_products_found:
            "No farm produce found for the selected filter.",

        // ---------- CART ----------
        cart_title: "Shopping Cart",
        cart_empty: "Your cart is empty",
        cart_empty_description:
            "Add fresh produce from the marketplace to continue.",
        add_to_cart: "Add to Cart",
        added_to_cart: "Added to cart",
        remove_item: "Remove item",
        update_cart: "Update Cart",
        proceed_checkout: "Proceed to Checkout",
        continue_shopping: "Continue Shopping",
        total: "Total",
        subtotal: "Subtotal",
        gst: "GST (5%)",
        delivery_charges: "Delivery Charges",
        platform_fee: "Platform Fee",
        grand_total: "Grand Total",
        amount: "Amount",
        only_available: "Only {quantity} {unit} available!",
        different_farmer_cart:
            "Your cart currently contains produce from a different farmer. Empty cart to add from this farmer.",

        // ---------- CHECKOUT ----------
        checkout: "Checkout",
        delivery_details: "Delivery Details",
        delivery_address: "Delivery Address",
        phone_number: "Phone Number",
        enter_delivery_address: "Enter delivery address",
        enter_phone_number: "Enter phone number",
        delivery_address_phone:
            "Please enter delivery address and phone number",
        payment_method: "Payment Method",
        select_payment_method: "Please select a payment method",
        online_payment: "Online Payment",
        upi_payment: "UPI Payment",
        cash_on_delivery: "Cash on Delivery",
        cod: "COD",
        pay_now: "Pay Now",
        place_order: "Place Order",

        // ---------- FARMER ----------
        farmer_dashboard: "Farmer Dashboard",
        add_product: "Add Product",
        product_name: "Product Name",
        crop_name: "Crop Name",
        quantity_available: "Quantity Available",
        price_per_unit: "Price Per Unit",
        upload_image: "Upload Image",
        product_details: "Product Details",
        selling_history: "Selling History",
        crop_history: "Crop Selling History",
        farmer_products: "My Products",

        // ---------- PAYMENT ----------
        payment: "Payment",
        payment_details: "Payment Details",
        payment_successful: "Payment Successful!",
        payment_failed: "Payment Failed",
        payment_pending: "Payment Pending",
        payment_verification_pending: "Payment Verification Pending",
        payment_status: "Payment Status",
        payment_method_label: "Payment Method",
        upi_id: "UPI ID",
        upi_id_unavailable: "UPI ID unavailable",
        enter_utr:
            "Please enter the Unique Transaction Reference (UTR) after payment.",
        invalid_utr: "Please enter a valid UTR number.",
        utr_reference: "UTR / Transaction Reference",
        transaction_reference: "Transaction Reference",
        confirm_payment: "Confirm Payment",
        pay_via_upi: "Pay via UPI",
        opening_payment_app: "Opening payment application...",
        order_created_upi:
            "Order created. Complete UPI payment and enter your UTR.",
        cod_order_placed:
            "COD order placed. Payment will be collected at delivery.",
        payment_confirmation_failed:
            "Failed to confirm payment",
        server_payment_error:
            "Server error during payment confirmation",

        // ---------- ORDERS ----------
        order: "Order",
        order_number: "Order Number",
        order_date: "Order Date",
        order_details: "Order Details",
        order_created: "Order Created",
        order_status: "Order Status",
        order_failed: "Failed to place order",
        order_error: "Error while placing order",
        no_orders:
            "You haven't placed any orders yet.",
        order_confirmation: "Order Confirmation",
        order_confirmed: "Order Confirmed",
        order_placed: "Order Placed",

        // ---------- ORDER STATUS ----------
        placed: "Placed",
        confirmed_by_farmer: "Confirmed by Farmer",
        picked_up: "Picked Up",
        out_for_delivery: "Out for Delivery",
        delivered: "Delivered",
        assigning_agent: "Assigning agent...",

        // ---------- DELIVERY ----------
        delivery: "Delivery",
        delivery_boy_label: "Delivery Boy",
        delivery_otp: "Delivery OTP",
        otp: "OTP",
        share_with_agent: "Share with agent upon arrival",
        otp_after_payment: "OTP generates after payment",
        pay_upi_get_otp: "Pay via UPI & Get OTP",

        // ---------- FARMER PAYMENT ----------
        farmer_payment: "Farmer Payment",
        farmer_upi: "Farmer UPI ID",
        farmer_name: "Farmer Name",

        // ---------- ADVISORY ----------
        plant_advisory: "Plant Advisory",
        consult_plant_advisory: "Consult Plant Advisory",
        advisory_expert: "Advisory Expert",
        agricultural_advisor: "Agricultural Advisor",
        ask_question: "Ask a Question",
        question: "Question",
        enter_question: "Enter your question",
        submit_question: "Submit Question",
        no_questions:
            "No questions submitted yet.",
        plant_inquiry_submitted:
            "Plant inquiry submitted to expert advisor!",
        failed_submit_query:
            "Failed to submit query",
        awaiting_response:
            "Awaiting response from agricultural specialist...",
        advisory_expert_response:
            "Advisory Expert Response ({name}):",
        gardening: "Gardening",

        // ---------- RECEIPT ----------
        receipt: "Receipt",
        payment_receipt: "PAYMENT RECEIPT",
        payment_success: "✓ PAYMENT SUCCESSFUL",
        integrated_farmer_marketplace:
            "Integrated Farmer Marketplace",
        order_details_receipt: "Order Details",
        buyer_details: "Buyer Details",
        farmer_details: "Farmer Details",
        name: "Name",
        phone: "Phone",
        address: "Address",
        delivery_address_label: "Delivery Address",
        upi_id_label: "UPI ID",
        district_label: "District",
        items_purchased: "Items Purchased",
        qty: "Qty",
        no_item_details:
            "No item details available",
        produce_subtotal: "Produce Subtotal",
        total_paid: "TOTAL PAID",
        security_note:
            "This is a computer-generated payment receipt.",
        receipt_downloaded:
            "Payment receipt downloaded successfully.",
        payment_receipt_not_available:
            "Payment receipt is not available.",
        receipt_generator_not_loaded:
            "Receipt generator is not loaded. Please refresh the page.",

        // ---------- TABLE ----------
        date: "Date",
        farmer_label: "Farmer",
        items_purchased_label: "Items Purchased",
        total_bill: "Total Bill",

        // ---------- LANGUAGE ----------
        language: "Language",
        english: "English",
        hindi: "Hindi",
        tamil: "Tamil",
        telugu: "Telugu"
    },


    // ============================================================
    // HINDI
    // ============================================================
    hi: {

        platform_name: "एग्रोमार्केट",
        logout: "लॉग आउट",
        login: "लॉगिन",
        register: "पंजीकरण",
        save: "सहेजें",
        cancel: "रद्द करें",
        close: "बंद करें",
        submit: "जमा करें",
        confirm: "पुष्टि करें",
        delete: "हटाएं",
        remove: "निकालें",
        edit: "संपादित करें",
        update: "अपडेट करें",
        search: "खोजें",
        filter: "फ़िल्टर",
        loading: "लोड हो रहा है...",
        available: "उपलब्ध",
        unavailable: "अनुपलब्ध",
        yes: "हाँ",
        no: "नहीं",
        back: "वापस",
        next: "अगला",
        previous: "पिछला",
        refresh: "रीफ्रेश",
        view: "देखें",
        add: "जोड़ें",

        farmer: "किसान",
        buyer: "खरीदार",
        advisor: "सलाहकार",
        delivery_boy: "डिलीवरी एजेंट",
        role_farmer: "किसान",
        role_buyer: "खरीदार",
        role_advisor: "सलाहकार",

        home: "होम",
        dashboard: "डैशबोर्ड",
        marketplace: "उत्पाद देखें",
        cart: "कार्ट",
        my_orders: "मेरे ऑर्डर और डिलीवरी OTP",
        orders: "ऑर्डर",
        profile: "प्रोफ़ाइल",
        settings: "सेटिंग्स",
        advisory: "पौधा सलाह",
        consult_advisory: "पौधा सलाह लें",

        buyer_portal: "खरीदार मार्केटप्लेस",
        buyer_description:
            "अपने जिले के किसानों से ताज़ी सब्ज़ियाँ, फल और अनाज सीधे खरीदें।",
        explore_produce: "उत्पाद देखें",
        district: "जिला",
        category: "श्रेणी",
        all_categories: "सभी श्रेणियाँ",
        search_products: "उत्पाद खोजें...",
        select_district: "जिला चुनें",
        select_category: "श्रेणी चुनें",
        product: "उत्पाद",
        products: "उत्पाद",
        price: "कीमत",
        quantity: "मात्रा",
        unit: "इकाई",
        stock: "स्टॉक",
        in_stock: "स्टॉक में उपलब्ध",
        out_of_stock: "स्टॉक में नहीं",
        sold_out: "बिक चुका है",
        farm_fresh_harvest: "ताज़ी कृषि उपज",
        no_products_found:
            "चयनित फ़िल्टर के लिए कोई कृषि उत्पाद नहीं मिला।",

        cart_title: "शॉपिंग कार्ट",
        cart_empty: "आपका कार्ट खाली है",
        cart_empty_description:
            "जारी रखने के लिए मार्केटप्लेस से ताज़ी उपज जोड़ें।",
        add_to_cart: "कार्ट में जोड़ें",
        added_to_cart: "कार्ट में जोड़ा गया",
        remove_item: "आइटम हटाएं",
        update_cart: "कार्ट अपडेट करें",
        proceed_checkout: "चेकआउट के लिए आगे बढ़ें",
        continue_shopping: "खरीदारी जारी रखें",
        total: "कुल",
        subtotal: "उप-कुल",
        gst: "GST (5%)",
        delivery_charges: "डिलीवरी शुल्क",
        platform_fee: "प्लेटफ़ॉर्म शुल्क",
        grand_total: "कुल राशि",
        amount: "राशि",
        only_available: "केवल {quantity} {unit} उपलब्ध है!",
        different_farmer_cart:
            "आपके कार्ट में दूसरे किसान की उपज है। इस किसान की उपज जोड़ने के लिए कार्ट खाली करें।",

        checkout: "चेकआउट",
        delivery_details: "डिलीवरी विवरण",
        delivery_address: "डिलीवरी पता",
        phone_number: "फ़ोन नंबर",
        enter_delivery_address: "डिलीवरी पता दर्ज करें",
        enter_phone_number: "फ़ोन नंबर दर्ज करें",
        delivery_address_phone:
            "कृपया डिलीवरी पता और फ़ोन नंबर दर्ज करें",
        payment_method: "भुगतान का तरीका",
        select_payment_method: "कृपया भुगतान का तरीका चुनें",
        online_payment: "ऑनलाइन भुगतान",
        upi_payment: "UPI भुगतान",
        cash_on_delivery: "कैश ऑन डिलीवरी",
        cod: "COD",
        pay_now: "अभी भुगतान करें",
        place_order: "ऑर्डर करें",

        farmer_dashboard: "किसान डैशबोर्ड",
        add_product: "उत्पाद जोड़ें",
        product_name: "उत्पाद का नाम",
        crop_name: "फसल का नाम",
        quantity_available: "उपलब्ध मात्रा",
        price_per_unit: "प्रति इकाई कीमत",
        upload_image: "छवि अपलोड करें",
        product_details: "उत्पाद विवरण",
        selling_history: "बिक्री इतिहास",
        crop_history: "फसल बिक्री इतिहास",
        farmer_products: "मेरे उत्पाद",

        payment: "भुगतान",
        payment_details: "भुगतान विवरण",
        payment_successful: "भुगतान सफल!",
        payment_failed: "भुगतान विफल",
        payment_pending: "भुगतान लंबित",
        payment_verification_pending: "भुगतान सत्यापन लंबित",
        payment_status: "भुगतान स्थिति",
        payment_method_label: "भुगतान का तरीका",
        upi_id: "UPI ID",
        upi_id_unavailable: "UPI ID उपलब्ध नहीं है",
        enter_utr:
            "भुगतान के बाद Unique Transaction Reference (UTR) दर्ज करें।",
        invalid_utr: "कृपया मान्य UTR नंबर दर्ज करें।",
        utr_reference: "UTR / लेनदेन संदर्भ",
        transaction_reference: "लेनदेन संदर्भ",
        confirm_payment: "भुगतान की पुष्टि करें",
        pay_via_upi: "UPI से भुगतान करें",
        opening_payment_app: "भुगतान एप्लिकेशन खोला जा रहा है...",
        order_created_upi:
            "ऑर्डर बनाया गया। UPI भुगतान पूरा करें और अपना UTR दर्ज करें।",
        cod_order_placed:
            "COD ऑर्डर दिया गया। भुगतान डिलीवरी के समय लिया जाएगा।",
        payment_confirmation_failed:
            "भुगतान की पुष्टि विफल रही",
        server_payment_error:
            "भुगतान पुष्टि के दौरान सर्वर त्रुटि",

        order: "ऑर्डर",
        order_number: "ऑर्डर नंबर",
        order_date: "ऑर्डर की तारीख",
        order_details: "ऑर्डर विवरण",
        order_created: "ऑर्डर बनाया गया",
        order_status: "ऑर्डर स्थिति",
        order_failed: "ऑर्डर देने में विफल",
        order_error: "ऑर्डर देते समय त्रुटि हुई",
        no_orders:
            "आपने अभी तक कोई ऑर्डर नहीं दिया है।",
        order_confirmation: "ऑर्डर पुष्टि",
        order_confirmed: "ऑर्डर की पुष्टि हो गई",
        order_placed: "ऑर्डर दिया गया",

        placed: "दिया गया",
        confirmed_by_farmer: "किसान द्वारा पुष्टि",
        picked_up: "उठा लिया गया",
        out_for_delivery: "डिलीवरी के लिए भेजा गया",
        delivered: "डिलीवर हो गया",
        assigning_agent: "डिलीवरी एजेंट नियुक्त किया जा रहा है...",

        delivery: "डिलीवरी",
        delivery_boy_label: "डिलीवरी एजेंट",
        delivery_otp: "डिलीवरी OTP",
        otp: "OTP",
        share_with_agent: "आने पर एजेंट के साथ साझा करें",
        otp_after_payment: "भुगतान के बाद OTP जनरेट होगा",
        pay_upi_get_otp: "UPI से भुगतान करें और OTP प्राप्त करें",

        farmer_payment: "किसान भुगतान",
        farmer_upi: "किसान UPI ID",
        farmer_name: "किसान का नाम",

        plant_advisory: "पौधा सलाह",
        consult_plant_advisory: "पौधा सलाह लें",
        advisory_expert: "सलाह विशेषज्ञ",
        agricultural_advisor: "कृषि सलाहकार",
        ask_question: "प्रश्न पूछें",
        question: "प्रश्न",
        enter_question: "अपना प्रश्न दर्ज करें",
        submit_question: "प्रश्न जमा करें",
        no_questions: "अभी तक कोई प्रश्न जमा नहीं किया गया है।",
        plant_inquiry_submitted:
            "पौधे से संबंधित प्रश्न विशेषज्ञ सलाहकार को भेज दिया गया है!",
        failed_submit_query:
            "प्रश्न भेजने में विफल",
        awaiting_response:
            "कृषि विशेषज्ञ के उत्तर की प्रतीक्षा है...",
        advisory_expert_response:
            "सलाह विशेषज्ञ का उत्तर ({name}):",
        gardening: "बागवानी",

        receipt: "रसीद",
        payment_receipt: "भुगतान रसीद",
        payment_success: "✓ भुगतान सफल",
        integrated_farmer_marketplace:
            "एकीकृत किसान मार्केटप्लेस",
        order_details_receipt: "ऑर्डर विवरण",
        buyer_details: "खरीदार विवरण",
        farmer_details: "किसान विवरण",
        name: "नाम",
        phone: "फ़ोन",
        address: "पता",
        delivery_address_label: "डिलीवरी पता",
        upi_id_label: "UPI ID",
        district_label: "जिला",
        items_purchased: "खरीदे गए उत्पाद",
        qty: "मात्रा",
        no_item_details: "आइटम का विवरण उपलब्ध नहीं है",
        produce_subtotal: "उत्पाद उप-कुल",
        total_paid: "कुल भुगतान",
        security_note:
            "यह कंप्यूटर द्वारा बनाई गई भुगतान रसीद है।",
        receipt_downloaded:
            "भुगतान रसीद सफलतापूर्वक डाउनलोड हो गई।",
        payment_receipt_not_available:
            "भुगतान रसीद उपलब्ध नहीं है।",
        receipt_generator_not_loaded:
            "रसीद जनरेटर लोड नहीं हुआ। कृपया पेज को रीफ्रेश करें।",

        date: "तारीख",
        farmer_label: "किसान",
        items_purchased_label: "खरीदे गए उत्पाद",
        total_bill: "कुल बिल",

        language: "भाषा",
        english: "अंग्रेज़ी",
        hindi: "हिंदी",
        tamil: "तमिल",
        telugu: "तेलुगु"
    },


    // ============================================================
    // TAMIL
    // ============================================================
    ta: {

        platform_name: "அக்ரோமார்க்கெட்",
        logout: "வெளியேறு",
        login: "உள்நுழைவு",
        register: "பதிவு",
        save: "சேமி",
        cancel: "ரத்து செய்",
        close: "மூடு",
        submit: "சமர்ப்பி",
        confirm: "உறுதிப்படுத்து",
        delete: "நீக்கு",
        remove: "அகற்று",
        edit: "திருத்து",
        update: "புதுப்பி",
        search: "தேடு",
        filter: "வடிகட்டி",
        loading: "ஏற்றப்படுகிறது...",
        available: "கிடைக்கிறது",
        unavailable: "கிடைக்கவில்லை",
        yes: "ஆம்",
        no: "இல்லை",
        back: "பின்",
        next: "அடுத்து",
        previous: "முந்தைய",
        refresh: "புதுப்பி",
        view: "பார்",
        add: "சேர்",

        farmer: "விவசாயி",
        buyer: "வாங்குபவர்",
        advisor: "ஆலோசகர்",
        delivery_boy: "டெலிவரி பணியாளர்",
        role_farmer: "விவசாயி",
        role_buyer: "வாங்குபவர்",
        role_advisor: "ஆலோசகர்",

        home: "முகப்பு",
        dashboard: "டாஷ்போர்டு",
        marketplace: "விவசாயப் பொருட்களைப் பார்க்க",
        cart: "வண்டி",
        my_orders: "எனது ஆர்டர்கள் & டெலிவரி OTP",
        orders: "ஆர்டர்கள்",
        profile: "சுயவிவரம்",
        settings: "அமைப்புகள்",
        advisory: "தாவர ஆலோசனை",
        consult_advisory: "தாவர ஆலோசனையைப் பெறுக",

        buyer_portal: "வாங்குபவர் சந்தை",
        buyer_description:
            "உங்கள் மாவட்டத்தில் உள்ள விவசாயிகளிடமிருந்து புதிய காய்கறிகள், பழங்கள் மற்றும் தானியங்களை நேரடியாக வாங்குங்கள்.",
        explore_produce: "விவசாயப் பொருட்களைப் பார்க்க",
        district: "மாவட்டம்",
        category: "வகை",
        all_categories: "அனைத்து வகைகள்",
        search_products: "பொருட்களைத் தேடுங்கள்...",
        select_district: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
        select_category: "வகையைத் தேர்ந்தெடுக்கவும்",
        product: "பொருள்",
        products: "பொருட்கள்",
        price: "விலை",
        quantity: "அளவு",
        unit: "அலகு",
        stock: "கையிருப்பு",
        in_stock: "கையிருப்பில் உள்ளது",
        out_of_stock: "கையிருப்பில் இல்லை",
        sold_out: "விற்றுத் தீர்ந்தது",
        farm_fresh_harvest: "புதிய விவசாய விளைபொருள்",
        no_products_found:
            "தேர்ந்தெடுக்கப்பட்ட வடிகட்டிக்கு எந்த விவசாயப் பொருளும் கிடைக்கவில்லை.",

        cart_title: "ஷாப்பிங் வண்டி",
        cart_empty: "உங்கள் வண்டி காலியாக உள்ளது",
        cart_empty_description:
            "தொடர, சந்தையிலிருந்து புதிய விவசாயப் பொருட்களைச் சேர்க்கவும்.",
        add_to_cart: "வண்டியில் சேர்",
        added_to_cart: "வண்டியில் சேர்க்கப்பட்டது",
        remove_item: "பொருளை அகற்று",
        update_cart: "வண்டியைப் புதுப்பி",
        proceed_checkout: "செக்அவுட்டிற்குச் செல்லவும்",
        continue_shopping: "ஷாப்பிங்கைத் தொடரவும்",
        total: "மொத்தம்",
        subtotal: "கூட்டுத்தொகை",
        gst: "GST (5%)",
        delivery_charges: "டெலிவரி கட்டணம்",
        platform_fee: "தளக் கட்டணம்",
        grand_total: "மொத்தத் தொகை",
        amount: "தொகை",
        only_available: "இப்போது {quantity} {unit} மட்டுமே கிடைக்கிறது!",
        different_farmer_cart:
            "உங்கள் வண்டியில் வேறு விவசாயியின் பொருட்கள் உள்ளன. இந்த விவசாயியிடமிருந்து பொருட்களைச் சேர்க்க வண்டியை காலி செய்யவும்.",

        checkout: "செக்அவுட்",
        delivery_details: "டெலிவரி விவரங்கள்",
        delivery_address: "டெலிவரி முகவரி",
        phone_number: "தொலைபேசி எண்",
        enter_delivery_address: "டெலிவரி முகவரியை உள்ளிடவும்",
        enter_phone_number: "தொலைபேசி எண்ணை உள்ளிடவும்",
        delivery_address_phone:
            "டெலிவரி முகவரி மற்றும் தொலைபேசி எண்ணை உள்ளிடவும்",
        payment_method: "பணம் செலுத்தும் முறை",
        select_payment_method: "பணம் செலுத்தும் முறையைத் தேர்ந்தெடுக்கவும்",
        online_payment: "ஆன்லைன் பணம் செலுத்துதல்",
        upi_payment: "UPI பணம் செலுத்துதல்",
        cash_on_delivery: "டெலிவரியின் போது பணம்",
        cod: "COD",
        pay_now: "இப்போது செலுத்தவும்",
        place_order: "ஆர்டர் செய்யவும்",

        farmer_dashboard: "விவசாயி டாஷ்போர்டு",
        add_product: "பொருளைச் சேர்",
        product_name: "பொருளின் பெயர்",
        crop_name: "பயிரின் பெயர்",
        quantity_available: "கிடைக்கும் அளவு",
        price_per_unit: "ஒரு அலகிற்கான விலை",
        upload_image: "படத்தைப் பதிவேற்றவும்",
        product_details: "பொருள் விவரங்கள்",
        selling_history: "விற்பனை வரலாறு",
        crop_history: "பயிர் விற்பனை வரலாறு",
        farmer_products: "எனது பொருட்கள்",

        payment: "பணம் செலுத்துதல்",
        payment_details: "பணம் செலுத்தும் விவரங்கள்",
        payment_successful: "பணம் செலுத்துதல் வெற்றி!",
        payment_failed: "பணம் செலுத்துதல் தோல்வியடைந்தது",
        payment_pending: "பணம் செலுத்துதல் நிலுவையில் உள்ளது",
        payment_verification_pending:
            "பணம் செலுத்துதல் சரிபார்ப்பு நிலுவையில் உள்ளது",
        payment_status: "பணம் செலுத்தும் நிலை",
        payment_method_label: "பணம் செலுத்தும் முறை",
        upi_id: "UPI ID",
        upi_id_unavailable: "UPI ID கிடைக்கவில்லை",
        enter_utr:
            "பணம் செலுத்திய பிறகு Unique Transaction Reference (UTR)-ஐ உள்ளிடவும்.",
        invalid_utr: "சரியான UTR எண்ணை உள்ளிடவும்.",
        utr_reference: "UTR / பரிவர்த்தனை குறிப்பு",
        transaction_reference: "பரிவர்த்தனை குறிப்பு",
        confirm_payment: "பணம் செலுத்தியதை உறுதிப்படுத்து",
        pay_via_upi: "UPI மூலம் செலுத்தவும்",
        opening_payment_app: "பணம் செலுத்தும் பயன்பாடு திறக்கப்படுகிறது...",
        order_created_upi:
            "ஆர்டர் உருவாக்கப்பட்டது. UPI பணம் செலுத்தி உங்கள் UTR-ஐ உள்ளிடவும்.",
        cod_order_placed:
            "COD ஆர்டர் செய்யப்பட்டது. டெலிவரி நேரத்தில் பணம் பெறப்படும்.",
        payment_confirmation_failed:
            "பணம் செலுத்தியதை உறுதிப்படுத்த முடியவில்லை",
        server_payment_error:
            "பணம் செலுத்துவதை உறுதிப்படுத்தும் போது சர்வர் பிழை ஏற்பட்டது",

        order: "ஆர்டர்",
        order_number: "ஆர்டர் எண்",
        order_date: "ஆர்டர் தேதி",
        order_details: "ஆர்டர் விவரங்கள்",
        order_created: "ஆர்டர் உருவாக்கப்பட்டது",
        order_status: "ஆர்டர் நிலை",
        order_failed: "ஆர்டர் செய்ய முடியவில்லை",
        order_error: "ஆர்டர் செய்யும் போது பிழை ஏற்பட்டது",
        no_orders:
            "நீங்கள் இன்னும் எந்த ஆர்டரையும் செய்யவில்லை.",
        order_confirmation: "ஆர்டர் உறுதிப்படுத்தல்",
        order_confirmed: "ஆர்டர் உறுதிப்படுத்தப்பட்டது",
        order_placed: "ஆர்டர் செய்யப்பட்டது",

        placed: "ஆர்டர் செய்யப்பட்டது",
        confirmed_by_farmer: "விவசாயியால் உறுதிப்படுத்தப்பட்டது",
        picked_up: "எடுத்துச் செல்லப்பட்டது",
        out_for_delivery: "டெலிவரிக்கு அனுப்பப்பட்டது",
        delivered: "டெலிவரி செய்யப்பட்டது",
        assigning_agent: "டெலிவரி பணியாளர் நியமிக்கப்படுகிறார்...",

        delivery: "டெலிவரி",
        delivery_boy_label: "டெலிவரி பணியாளர்",
        delivery_otp: "டெலிவரி OTP",
        otp: "OTP",
        share_with_agent: "வந்ததும் டெலிவரி பணியாளருடன் பகிரவும்",
        otp_after_payment: "பணம் செலுத்திய பிறகு OTP உருவாக்கப்படும்",
        pay_upi_get_otp: "UPI மூலம் செலுத்தி OTP பெறவும்",

        farmer_payment: "விவசாயிக்கான பணம்",
        farmer_upi: "விவசாயி UPI ID",
        farmer_name: "விவசாயியின் பெயர்",

        plant_advisory: "தாவர ஆலோசனை",
        consult_plant_advisory: "தாவர ஆலோசனையைப் பெறுக",
        advisory_expert: "ஆலோசனை நிபுணர்",
        agricultural_advisor: "விவசாய ஆலோசகர்",
        ask_question: "கேள்வி கேளுங்கள்",
        question: "கேள்வி",
        enter_question: "உங்கள் கேள்வியை உள்ளிடவும்",
        submit_question: "கேள்வியைச் சமர்ப்பிக்கவும்",
        no_questions:
            "இதுவரை எந்த கேள்வியும் சமர்ப்பிக்கப்படவில்லை.",
        plant_inquiry_submitted:
            "தாவர தொடர்பான கேள்வி நிபுணர் ஆலோசகருக்கு அனுப்பப்பட்டது!",
        failed_submit_query:
            "கேள்வியைச் சமர்ப்பிக்க முடியவில்லை",
        awaiting_response:
            "விவசாய நிபுணரின் பதிலை எதிர்பார்க்கிறது...",
        advisory_expert_response:
            "ஆலோசனை நிபுணரின் பதில் ({name}):",
        gardening: "தோட்டக்கலை",

        receipt: "ரசீது",
        payment_receipt: "பணம் செலுத்திய ரசீது",
        payment_success: "✓ பணம் செலுத்துதல் வெற்றி",
        integrated_farmer_marketplace:
            "ஒருங்கிணைந்த விவசாயி சந்தை",
        order_details_receipt: "ஆர்டர் விவரங்கள்",
        buyer_details: "வாங்குபவர் விவரங்கள்",
        farmer_details: "விவசாயி விவரங்கள்",
        name: "பெயர்",
        phone: "தொலைபேசி",
        address: "முகவரி",
        delivery_address_label: "டெலிவரி முகவரி",
        upi_id_label: "UPI ID",
        district_label: "மாவட்டம்",
        items_purchased: "வாங்கிய பொருட்கள்",
        qty: "அளவு",
        no_item_details: "பொருள் விவரங்கள் கிடைக்கவில்லை",
        produce_subtotal: "விவசாயப் பொருட்களின் கூட்டுத்தொகை",
        total_paid: "செலுத்திய மொத்தம்",
        security_note:
            "இது கணினியால் உருவாக்கப்பட்ட பணம் செலுத்திய ரசீது.",
        receipt_downloaded:
            "பணம் செலுத்திய ரசீது வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது.",
        payment_receipt_not_available:
            "பணம் செலுத்திய ரசீது கிடைக்கவில்லை.",
        receipt_generator_not_loaded:
            "ரசீது உருவாக்கி ஏற்றப்படவில்லை. பக்கத்தை புதுப்பிக்கவும்.",

        date: "தேதி",
        farmer_label: "விவசாயி",
        items_purchased_label: "வாங்கிய பொருட்கள்",
        total_bill: "மொத்த பில்",

        language: "மொழி",
        english: "ஆங்கிலம்",
        hindi: "இந்தி",
        tamil: "தமிழ்",
        telugu: "தெலுங்கு"
    },


    // ============================================================
    // TELUGU
    // ============================================================
    te: {

        platform_name: "అగ్రోమార్కెట్",
        logout: "లాగ్ అవుట్",
        login: "లాగిన్",
        register: "నమోదు",
        save: "సేవ్ చేయండి",
        cancel: "రద్దు చేయండి",
        close: "మూసివేయండి",
        submit: "సమర్పించండి",
        confirm: "నిర్ధారించండి",
        delete: "తొలగించండి",
        remove: "తీసివేయండి",
        edit: "సవరించండి",
        update: "అప్‌డేట్ చేయండి",
        search: "శోధించండి",
        filter: "ఫిల్టర్",
        loading: "లోడ్ అవుతోంది...",
        available: "అందుబాటులో ఉంది",
        unavailable: "అందుబాటులో లేదు",
        yes: "అవును",
        no: "కాదు",
        back: "వెనుకకు",
        next: "తదుపరి",
        previous: "మునుపటి",
        refresh: "రిఫ్రెష్",
        view: "చూడండి",
        add: "జోడించండి",

        farmer: "రైతు",
        buyer: "కొనుగోలుదారు",
        advisor: "సలహాదారు",
        delivery_boy: "డెలివరీ సిబ్బంది",
        role_farmer: "రైతు",
        role_buyer: "కొనుగోలుదారు",
        role_advisor: "సలహాదారు",

        home: "హోమ్",
        dashboard: "డ్యాష్‌బోర్డ్",
        marketplace: "పంట ఉత్పత్తులను చూడండి",
        cart: "కార్ట్",
        my_orders: "నా ఆర్డర్లు & డెలివరీ OTP",
        orders: "ఆర్డర్లు",
        profile: "ప్రొఫైల్",
        settings: "సెట్టింగ్స్",
        advisory: "మొక్కల సలహా",
        consult_advisory: "మొక్కల సలహా పొందండి",

        buyer_portal: "కొనుగోలుదారు మార్కెట్‌ప్లేస్",
        buyer_description:
            "మీ జిల్లాలోని రైతుల నుండి తాజా కూరగాయలు, పండ్లు మరియు ధాన్యాలను నేరుగా కొనుగోలు చేయండి.",
        explore_produce: "పంట ఉత్పత్తులను చూడండి",
        district: "జిల్లా",
        category: "వర్గం",
        all_categories: "అన్ని వర్గాలు",
        search_products: "ఉత్పత్తులను శోధించండి...",
        select_district: "జిల్లాను ఎంచుకోండి",
        select_category: "వర్గాన్ని ఎంచుకోండి",
        product: "ఉత్పత్తి",
        products: "ఉత్పత్తులు",
        price: "ధర",
        quantity: "పరిమాణం",
        unit: "యూనిట్",
        stock: "స్టాక్",
        in_stock: "స్టాక్‌లో ఉంది",
        out_of_stock: "స్టాక్‌లో లేదు",
        sold_out: "అమ్ముడైంది",
        farm_fresh_harvest: "తాజా వ్యవసాయ ఉత్పత్తి",
        no_products_found:
            "ఎంచుకున్న ఫిల్టర్‌కు వ్యవసాయ ఉత్పత్తులు ఏవీ కనుగొనబడలేదు.",

        cart_title: "షాపింగ్ కార్ట్",
        cart_empty: "మీ కార్ట్ ఖాళీగా ఉంది",
        cart_empty_description:
            "కొనసాగించడానికి మార్కెట్‌ప్లేస్ నుండి తాజా ఉత్పత్తులను జోడించండి.",
        add_to_cart: "కార్ట్‌కు జోడించండి",
        added_to_cart: "కార్ట్‌కు జోడించబడింది",
        remove_item: "ఉత్పత్తిని తొలగించండి",
        update_cart: "కార్ట్‌ను అప్‌డేట్ చేయండి",
        proceed_checkout: "చెక్‌అవుట్‌కు వెళ్లండి",
        continue_shopping: "షాపింగ్ కొనసాగించండి",
        total: "మొత్తం",
        subtotal: "ఉప మొత్తం",
        gst: "GST (5%)",
        delivery_charges: "డెలివరీ ఛార్జీలు",
        platform_fee: "ప్లాట్‌ఫారమ్ ఫీజు",
        grand_total: "మొత్తం చెల్లించాల్సినది",
        amount: "మొత్తం",
        only_available: "కేవలం {quantity} {unit} మాత్రమే అందుబాటులో ఉంది!",
        different_farmer_cart:
            "మీ కార్ట్‌లో వేరే రైతు ఉత్పత్తులు ఉన్నాయి. ఈ రైతు నుండి ఉత్పత్తిని జోడించడానికి కార్ట్‌ను ఖాళీ చేయండి.",

        checkout: "చెక్‌అవుట్",
        delivery_details: "డెలివరీ వివరాలు",
        delivery_address: "డెలివరీ చిరునామా",
        phone_number: "ఫోన్ నంబర్",
        enter_delivery_address: "డెలివరీ చిరునామాను నమోదు చేయండి",
        enter_phone_number: "ఫోన్ నంబర్‌ను నమోదు చేయండి",
        delivery_address_phone:
            "దయచేసి డెలివరీ చిరునామా మరియు ఫోన్ నంబర్‌ను నమోదు చేయండి",
        payment_method: "చెల్లింపు పద్ధతి",
        select_payment_method: "దయచేసి చెల్లింపు పద్ధతిని ఎంచుకోండి",
        online_payment: "ఆన్‌లైన్ చెల్లింపు",
        upi_payment: "UPI చెల్లింపు",
        cash_on_delivery: "డెలివరీ సమయంలో నగదు",
        cod: "COD",
        pay_now: "ఇప్పుడే చెల్లించండి",
        place_order: "ఆర్డర్ చేయండి",

        farmer_dashboard: "రైతు డ్యాష్‌బోర్డ్",
        add_product: "ఉత్పత్తిని జోడించండి",
        product_name: "ఉత్పత్తి పేరు",
        crop_name: "పంట పేరు",
        quantity_available: "అందుబాటులో ఉన్న పరిమాణం",
        price_per_unit: "యూనిట్ ధర",
        upload_image: "చిత్రాన్ని అప్‌లోడ్ చేయండి",
        product_details: "ఉత్పత్తి వివరాలు",
        selling_history: "అమ్మకాల చరిత్ర",
        crop_history: "పంట అమ్మకాల చరిత్ర",
        farmer_products: "నా ఉత్పత్తులు",

        payment: "చెల్లింపు",
        payment_details: "చెల్లింపు వివరాలు",
        payment_successful: "చెల్లింపు విజయవంతమైంది!",
        payment_failed: "చెల్లింపు విఫలమైంది",
        payment_pending: "చెల్లింపు పెండింగ్‌లో ఉంది",
        payment_verification_pending:
            "చెల్లింపు ధృవీకరణ పెండింగ్‌లో ఉంది",
        payment_status: "చెల్లింపు స్థితి",
        payment_method_label: "చెల్లింపు పద్ధతి",
        upi_id: "UPI ID",
        upi_id_unavailable: "UPI ID అందుబాటులో లేదు",
        enter_utr:
            "చెల్లింపు చేసిన తర్వాత Unique Transaction Reference (UTR) నమోదు చేయండి.",
        invalid_utr: "దయచేసి సరైన UTR నంబర్‌ను నమోదు చేయండి.",
        utr_reference: "UTR / లావాదేవీ సూచన",
        transaction_reference: "లావాదేవీ సూచన",
        confirm_payment: "చెల్లింపును నిర్ధారించండి",
        pay_via_upi: "UPI ద్వారా చెల్లించండి",
        opening_payment_app: "చెల్లింపు అప్లికేషన్ తెరవబడుతోంది...",
        order_created_upi:
            "ఆర్డర్ సృష్టించబడింది. UPI చెల్లింపు పూర్తి చేసి మీ UTR నమోదు చేయండి.",
        cod_order_placed:
            "COD ఆర్డర్ చేయబడింది. డెలివరీ సమయంలో చెల్లింపు తీసుకోబడుతుంది.",
        payment_confirmation_failed:
            "చెల్లింపును నిర్ధారించడంలో విఫలమైంది",
        server_payment_error:
            "చెల్లింపు నిర్ధారణ సమయంలో సర్వర్ లోపం",

        order: "ఆర్డర్",
        order_number: "ఆర్డర్ నంబర్",
        order_date: "ఆర్డర్ తేదీ",
        order_details: "ఆర్డర్ వివరాలు",
        order_created: "ఆర్డర్ సృష్టించబడింది",
        order_status: "ఆర్డర్ స్థితి",
        order_failed: "ఆర్డర్ చేయడంలో విఫలమైంది",
        order_error: "ఆర్డర్ చేసే సమయంలో లోపం ఏర్పడింది",
        no_orders:
            "మీరు ఇంకా ఎటువంటి ఆర్డర్ చేయలేదు.",
        order_confirmation: "ఆర్డర్ నిర్ధారణ",
        order_confirmed: "ఆర్డర్ నిర్ధారించబడింది",
        order_placed: "ఆర్డర్ చేయబడింది",

        placed: "ఆర్డర్ చేయబడింది",
        confirmed_by_farmer: "రైతు నిర్ధారించారు",
        picked_up: "తీసుకెళ్లబడింది",
        out_for_delivery: "డెలివరీకి బయలుదేరింది",
        delivered: "డెలివరీ చేయబడింది",
        assigning_agent: "డెలివరీ సిబ్బందిని కేటాయిస్తోంది...",

        delivery: "డెలివరీ",
        delivery_boy_label: "డెలివరీ సిబ్బంది",
        delivery_otp: "డెలివరీ OTP",
        otp: "OTP",
        share_with_agent: "వచ్చినప్పుడు డెలివరీ సిబ్బందితో పంచుకోండి",
        otp_after_payment: "చెల్లింపు చేసిన తర్వాత OTP రూపొందించబడుతుంది",
        pay_upi_get_otp: "UPI ద్వారా చెల్లించి OTP పొందండి",

        farmer_payment: "రైతు చెల్లింపు",
        farmer_upi: "రైతు UPI ID",
        farmer_name: "రైతు పేరు",

        plant_advisory: "మొక్కల సలహా",
        consult_plant_advisory: "మొక్కల సలహా పొందండి",
        advisory_expert: "సలహా నిపుణుడు",
        agricultural_advisor: "వ్యవసాయ సలహాదారు",
        ask_question: "ప్రశ్న అడగండి",
        question: "ప్రశ్న",
        enter_question: "మీ ప్రశ్నను నమోదు చేయండి",
        submit_question: "ప్రశ్నను సమర్పించండి",
        no_questions:
            "ఇంకా ఎటువంటి ప్రశ్న సమర్పించబడలేదు.",
        plant_inquiry_submitted:
            "మొక్కకు సంబంధించిన ప్రశ్న నిపుణ సలహాదారుకు పంపబడింది!",
        failed_submit_query:
            "ప్రశ్నను సమర్పించడంలో విఫలమైంది",
        awaiting_response:
            "వ్యవసాయ నిపుణుడి సమాధానం కోసం వేచి ఉంది...",
        advisory_expert_response:
            "సలహా నిపుణుడి సమాధానం ({name}):",
        gardening: "తోటపని",

        receipt: "రసీదు",
        payment_receipt: "చెల్లింపు రసీదు",
        payment_success: "✓ చెల్లింపు విజయవంతమైంది",
        integrated_farmer_marketplace:
            "ఇంటిగ్రేటెడ్ ఫార్మర్ మార్కెట్‌ప్లేస్",
        order_details_receipt: "ఆర్డర్ వివరాలు",
        buyer_details: "కొనుగోలుదారు వివరాలు",
        farmer_details: "రైతు వివరాలు",
        name: "పేరు",
        phone: "ఫోన్",
        address: "చిరునామా",
        delivery_address_label: "డెలివరీ చిరునామా",
        upi_id_label: "UPI ID",
        district_label: "జిల్లా",
        items_purchased: "కొనుగోలు చేసిన ఉత్పత్తులు",
        qty: "పరిమాణం",
        no_item_details: "ఉత్పత్తి వివరాలు అందుబాటులో లేవు",
        produce_subtotal: "ఉత్పత్తుల ఉప మొత్తం",
        total_paid: "చెల్లించిన మొత్తం",
        security_note:
            "ఇది కంప్యూటర్ ద్వారా రూపొందించబడిన చెల్లింపు రసీదు.",
        receipt_downloaded:
            "చెల్లింపు రసీదు విజయవంతంగా డౌన్‌లోడ్ చేయబడింది.",
        payment_receipt_not_available:
            "చెల్లింపు రసీదు అందుబాటులో లేదు.",
        receipt_generator_not_loaded:
            "రసీదు జనరేటర్ లోడ్ కాలేదు. దయచేసి పేజీని రిఫ్రెష్ చేయండి.",

        date: "తేదీ",
        farmer_label: "రైతు",
        items_purchased_label: "కొనుగోలు చేసిన ఉత్పత్తులు",
        total_bill: "మొత్తం బిల్లు",

        language: "భాష",
        english: "ఆంగ్లం",
        hindi: "హిందీ",
        tamil: "తమిళం",
        telugu: "తెలుగు"
    }
};


// ============================================================
// LANGUAGE FUNCTIONS
// ============================================================

/**
 * Get currently selected language.
 */
function getCurrentLang() {
    return localStorage.getItem("agromarket_lang") || "en";
}


/**
 * Translate a key.
 *
 * Supports placeholders:
 *
 * t("only_available", {
 *     quantity: 5,
 *     unit: "kg"
 * })
 */
function t(key, params = {}) {

    const currentLang = getCurrentLang();

    let text =
        (translations[currentLang] &&
            translations[currentLang][key]) ||
        translations.en[key] ||
        key;

    Object.keys(params).forEach(param => {
        text = text.replace(
            new RegExp(`\\{${param}\\}`, "g"),
            params[param]
        );
    });

    return text;
}


/**
 * Apply selected language to all HTML elements
 * containing data-i18n.
 */
function applyLanguage(langCode) {

    // Check language
    if (!translations[langCode]) {
        langCode = "en";
    }

    // Save language permanently for the browser session/site
    localStorage.setItem("agromarket_lang", langCode);

    const dict = translations[langCode];

    // --------------------------------------------------------
    // Normal text elements
    // --------------------------------------------------------
    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (!dict[key]) {
            return;
        }

        if (
            element.tagName === "INPUT" ||
            element.tagName === "TEXTAREA"
        ) {
            element.placeholder = dict[key];
        } else {
            element.textContent = dict[key];
        }
    });


    // --------------------------------------------------------
    // Placeholder translation
    // data-i18n-placeholder="search_products"
    // --------------------------------------------------------
    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n-placeholder");

            if (dict[key]) {
                element.placeholder = dict[key];
            }
        });


    // --------------------------------------------------------
    // Title translation
    // data-i18n-title="..."
    // --------------------------------------------------------
    document
        .querySelectorAll("[data-i18n-title]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n-title");

            if (dict[key]) {
                element.title = dict[key];
            }
        });


    // --------------------------------------------------------
    // Select language dropdown
    // --------------------------------------------------------
    const langSelect =
        document.getElementById("lang-select");

    if (langSelect) {
        langSelect.value = langCode;
    }


    // --------------------------------------------------------
    // Notify dynamic JavaScript files
    // --------------------------------------------------------
    window.dispatchEvent(
        new CustomEvent("languageChanged", {
            detail: {
                language: langCode
            }
        })
    );
}


// ============================================================
// AUTOMATIC LANGUAGE LOADING
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // Get previously selected language
    const savedLanguage = getCurrentLang();

    // Apply it automatically
    applyLanguage(savedLanguage);


    // Language dropdown
    const langSelect =
        document.getElementById("lang-select");

    if (langSelect) {

        langSelect.addEventListener("change", function () {

            applyLanguage(this.value);

        });
    }

});