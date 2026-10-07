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
        invalid_utr_length: "UTR must contain exactly 12 digits.",

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
        telugu: "Telugu",

        in_stock: "In Stock: {quantity} {unit}",
out_of_stock: "Out of Stock",

plant_produce_placeholder:
    "e.g. Tomato, Coriander, Balcony Garden",

topic_question_placeholder:
    "e.g. How to preserve fresh tomatoes?",

advisory_details_placeholder:
    "Explain your question in detail...",
    edit_upi: "Edit UPI ID",
upi_edit_description: "Update the UPI ID where you want to receive buyer payments.",
enter_upi_id: "Enter UPI ID",
upi_placeholder: "example@upi",
upi_format_hint: "Enter a valid UPI ID, for example: yourname@upi",
save_upi: "Save UPI ID",

welcome_back: "WELCOME BACK",

unit_kg: "kg (Kilogram)",
unit_quintal: "quintal",
unit_bunch_pack: "bunch / pack",
unit_bottle: "bottle / litre",
unit_piece: "piece",
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
        invalid_utr_length: "UTR में ठीक 12 अंक होने चाहिए।",
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
        telugu: "तेलुगु",

        in_stock: "स्टॉक में: {quantity} {unit}",
out_of_stock: "स्टॉक में नहीं है",
plant_produce_placeholder:
    "उदा. टमाटर, धनिया, बालकनी गार्डन",

topic_question_placeholder:
    "उदा. ताजे टमाटर को कैसे सुरक्षित रखें?",

advisory_details_placeholder:
    "अपना प्रश्न विस्तार से बताएं...",
    edit_upi: "UPI ID संपादित करें",
upi_edit_description: "वह UPI ID अपडेट करें जहाँ आप खरीदारों से भुगतान प्राप्त करना चाहते हैं।",
enter_upi_id: "UPI ID दर्ज करें",
upi_placeholder: "example@upi",
upi_format_hint: "मान्य UPI ID दर्ज करें, उदाहरण: yourname@upi",
save_upi: "UPI ID सहेजें",

welcome_back: "वापसी पर आपका स्वागत है",

unit_kg: "किग्रा (किलोग्राम)",
unit_quintal: "क्विंटल",
unit_bunch_pack: "गुच्छा / पैक",
unit_bottle: "बोतल",
unit_piece: "टुकड़ा",
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
        invalid_utr_length: "UTR-ல் சரியாக 12 இலக்கங்கள் இருக்க வேண்டும்.",
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
        telugu: "தெலுங்கு",
        in_stock: "கையிருப்பில்: {quantity} {unit}",
out_of_stock: "கையிருப்பில் இல்லை",
plant_produce_placeholder:
    "எ.கா. தக்காளி, கொத்தமல்லி, பால்கனி தோட்டம்",

topic_question_placeholder:
    "எ.கா. புதிய தக்காளியை எவ்வாறு பாதுகாப்பது?",

advisory_details_placeholder:
    "உங்கள் கேள்வியை விரிவாக விளக்கவும்...",

    edit_upi: "UPI ID-ஐ திருத்தவும்",
upi_edit_description: "வாங்குபவர்களிடமிருந்து பணம் பெற வேண்டிய UPI ID-ஐ புதுப்பிக்கவும்.",
enter_upi_id: "UPI ID-ஐ உள்ளிடவும்",
upi_placeholder: "example@upi",
upi_format_hint: "சரியான UPI ID-ஐ உள்ளிடவும், உதாரணம்: yourname@upi",
save_upi: "UPI ID-ஐ சேமிக்கவும்",

welcome_back: "மீண்டும் வரவேற்கிறோம்",

unit_kg: "கிலோ (கிலோகிராம்)",
unit_quintal: "குவிண்டால்",
unit_bunch_pack: "கொத்து / பேக்",
unit_bottle: "பாட்டில் / litre",
unit_piece: "துண்டு",
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
        invalid_utr_length: "UTRలో ఖచ్చితంగా 12 అంకెలు ఉండాలి.",
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
        telugu: "తెలుగు",

        in_stock: "అందుబాటులో ఉంది: {quantity} {unit}",
out_of_stock: "అందుబాటులో లేదు",

plant_produce_placeholder:
    "ఉదా. టమాటా, కొత్తిమీర, బాల్కనీ తోట",

topic_question_placeholder:
    "ఉదా. తాజా టమాటాలను ఎలా నిల్వ చేయాలి?",

advisory_details_placeholder:
    "మీ ప్రశ్నను వివరంగా తెలియజేయండి...",

    edit_upi: "UPI IDని సవరించండి",
upi_edit_description: "కొనుగోలుదారుల నుండి చెల్లింపులు పొందే UPI IDని నవీకరించండి.",
enter_upi_id: "UPI IDని నమోదు చేయండి",
upi_placeholder: "example@upi",
upi_format_hint: "చెల్లుబాటు అయ్యే UPI IDని నమోదు చేయండి, ఉదాహరణ: yourname@upi",
save_upi: "UPI IDని సేవ్ చేయండి",

welcome_back: "తిరిగి స్వాగతం",

unit_kg: "కిలో (కిలోగ్రామ్)",
unit_quintal: "క్వింటాల్",
unit_bunch_pack: "కట్ట / ప్యాక్",
unit_bottle: "బాటిల్",
unit_piece: "ముక్క",


    }
};

// ============================================================
// Additional translations for all frontend pages
// ============================================================

Object.assign(translations.en, {

    active_deliveries: "Active Deliveries",
    advisory_portal: "Advisory Portal",
    agricultural_advisory: "Agricultural Advisory",
    agricultural_advisory_desc:
        "Get agricultural guidance and connect with advisors.",
    answer_query: "Answer Query",
    available_pickups: "Available Pickups",
    bank_details: "Bank Details",
    buyer_services: "Buyer Services",
    buyer_services_desc:
        "Find fresh farm products directly from farmers.",
    crop_type: "Crop Type",
    delivery_fee: "Delivery Fee",
    delivery_payout: "Delivery Payout",
    delivery_portal: "Delivery Portal",
    describe_issue: "Describe Issue",
    description: "Description",
    direct_marketplace: "Direct Marketplace",
    direct_marketplace_desc:
        "Buy and sell agricultural products directly.",
    enter_buyer_otp: "Enter Buyer OTP",
    farmer_portal: "Farmer Portal",
    features: "Features",
    features_title: "Our Features",
    get_started: "Get Started",
    give_otp_to_agent: "Give OTP to Agent",
    gst_charges: "GST Charges",
    hero_description:
        "An integrated platform connecting farmers, buyers and agricultural advisors.",
    item_subtotal: "Item Subtotal",
    monthly_earnings: "Monthly Earnings",
    my_products: "My Products",
    orders_received: "Orders Received",
    query_subject: "Query Subject",
    role_advisory: "Agricultural Advisor",
    role_delivery: "Delivery Agent",
    save_changes: "Save Changes",
    secure_delivery: "Secure Delivery",
    secure_delivery_desc:
        "Reliable and secure delivery of agricultural products.",
    send_reply: "Send Reply",
    stock_qty: "Stock Quantity",
    upi_qr_code: "UPI QR Code",
    verify_otp_deliver: "Verify OTP to Deliver",
    weather_widget_title: "Weather"
});


Object.assign(translations.hi, {

    active_deliveries: "सक्रिय डिलीवरी",
    advisory_portal: "सलाहकार पोर्टल",
    agricultural_advisory: "कृषि सलाह",
    agricultural_advisory_desc:
        "कृषि संबंधी मार्गदर्शन प्राप्त करें और सलाहकारों से जुड़ें।",
    answer_query: "प्रश्न का उत्तर दें",
    available_pickups: "उपलब्ध पिकअप",
    bank_details: "बैंक विवरण",
    buyer_services: "खरीदार सेवाएँ",
    buyer_services_desc:
        "किसानों से सीधे ताज़ा कृषि उत्पाद खोजें।",
    crop_type: "फसल का प्रकार",
    delivery_fee: "डिलीवरी शुल्क",
    delivery_payout: "डिलीवरी भुगतान",
    delivery_portal: "डिलीवरी पोर्टल",
    describe_issue: "समस्या का विवरण दें",
    description: "विवरण",
    direct_marketplace: "प्रत्यक्ष मार्केटप्लेस",
    direct_marketplace_desc:
        "कृषि उत्पाद सीधे खरीदें और बेचें।",
    enter_buyer_otp: "खरीदार OTP दर्ज करें",
    farmer_portal: "किसान पोर्टल",
    features: "विशेषताएँ",
    features_title: "हमारी विशेषताएँ",
    get_started: "शुरू करें",
    give_otp_to_agent: "एजेंट को OTP दें",
    gst_charges: "GST शुल्क",
    hero_description:
        "किसानों, खरीदारों और कृषि सलाहकारों को जोड़ने वाला एकीकृत प्लेटफ़ॉर्म।",
    item_subtotal: "आइटम उप-योग",
    monthly_earnings: "मासिक आय",
    my_products: "मेरे उत्पाद",
    orders_received: "प्राप्त ऑर्डर",
    query_subject: "प्रश्न का विषय",
    role_advisory: "कृषि सलाहकार",
    role_delivery: "डिलीवरी एजेंट",
    save_changes: "परिवर्तन सहेजें",
    secure_delivery: "सुरक्षित डिलीवरी",
    secure_delivery_desc:
        "कृषि उत्पादों की विश्वसनीय और सुरक्षित डिलीवरी।",
    send_reply: "उत्तर भेजें",
    stock_qty: "स्टॉक मात्रा",
    upi_qr_code: "UPI QR कोड",
    verify_otp_deliver: "डिलीवरी के लिए OTP सत्यापित करें",
    weather_widget_title: "मौसम"
});


Object.assign(translations.ta, {

    active_deliveries: "செயலில் உள்ள விநியோகங்கள்",
    advisory_portal: "ஆலோசனை தளம்",
    agricultural_advisory: "வேளாண் ஆலோசனை",
    agricultural_advisory_desc:
        "வேளாண் வழிகாட்டுதலைப் பெற்று ஆலோசகர்களுடன் இணையுங்கள்.",
    answer_query: "கேள்விக்கு பதிலளிக்கவும்",
    available_pickups: "கிடைக்கும் பிக்கப்",
    bank_details: "வங்கி விவரங்கள்",
    buyer_services: "வாங்குபவர் சேவைகள்",
    buyer_services_desc:
        "விவசாயிகளிடமிருந்து நேரடியாக புதிய வேளாண் பொருட்களைத் தேடுங்கள்.",
    crop_type: "பயிர் வகை",
    delivery_fee: "விநியோகக் கட்டணம்",
    delivery_payout: "விநியோகப் பணம்",
    delivery_portal: "விநியோக தளம்",
    describe_issue: "சிக்கலை விவரிக்கவும்",
    description: "விளக்கம்",
    direct_marketplace: "நேரடி சந்தை",
    direct_marketplace_desc:
        "வேளாண் பொருட்களை நேரடியாக வாங்கி விற்கவும்.",
    enter_buyer_otp: "வாங்குபவர் OTP-ஐ உள்ளிடவும்",
    farmer_portal: "விவசாயி தளம்",
    features: "அம்சங்கள்",
    features_title: "எங்கள் அம்சங்கள்",
    get_started: "தொடங்குங்கள்",
    give_otp_to_agent: "முகவரிடம் OTP-ஐ வழங்கவும்",
    gst_charges: "GST கட்டணங்கள்",
    hero_description:
        "விவசாயிகள், வாங்குபவர்கள் மற்றும் வேளாண் ஆலோசகர்களை இணைக்கும் ஒருங்கிணைந்த தளம்.",
    item_subtotal: "பொருள் இடைக்கூட்டுத்தொகை",
    monthly_earnings: "மாதாந்திர வருமானம்",
    my_products: "எனது பொருட்கள்",
    orders_received: "பெறப்பட்ட ஆர்டர்கள்",
    query_subject: "கேள்வியின் தலைப்பு",
    role_advisory: "வேளாண் ஆலோசகர்",
    role_delivery: "விநியோக முகவர்",
    save_changes: "மாற்றங்களைச் சேமிக்கவும்",
    secure_delivery: "பாதுகாப்பான விநியோகம்",
    secure_delivery_desc:
        "வேளாண் பொருட்களின் நம்பகமான மற்றும் பாதுகாப்பான விநியோகம்.",
    send_reply: "பதிலை அனுப்பவும்",
    stock_qty: "கையிருப்பு அளவு",
    upi_qr_code: "UPI QR குறியீடு",
    verify_otp_deliver: "விநியோகிக்க OTP-ஐ சரிபார்க்கவும்",
    weather_widget_title: "வானிலை"
});


Object.assign(translations.te, {

    active_deliveries: "క్రియాశీల డెలివరీలు",
    advisory_portal: "సలహా పోర్టల్",
    agricultural_advisory: "వ్యవసాయ సలహా",
    agricultural_advisory_desc:
        "వ్యవసాయ మార్గదర్శకత్వం పొందండి మరియు సలహాదారులతో కనెక్ట్ అవ్వండి.",
    answer_query: "ప్రశ్నకు సమాధానం ఇవ్వండి",
    available_pickups: "అందుబాటులో ఉన్న పికప్‌లు",
    bank_details: "బ్యాంక్ వివరాలు",
    buyer_services: "కొనుగోలుదారు సేవలు",
    buyer_services_desc:
        "రైతుల నుండి నేరుగా తాజా వ్యవసాయ ఉత్పత్తులను కనుగొనండి.",
    crop_type: "పంట రకం",
    delivery_fee: "డెలివరీ రుసుము",
    delivery_payout: "డెలివరీ చెల్లింపు",
    delivery_portal: "డెలివరీ పోర్టల్",
    describe_issue: "సమస్యను వివరించండి",
    description: "వివరణ",
    direct_marketplace: "ప్రత్యక్ష మార్కెట్‌ప్లేస్",
    direct_marketplace_desc:
        "వ్యవసాయ ఉత్పత్తులను నేరుగా కొనుగోలు చేసి విక్రయించండి.",
    enter_buyer_otp: "కొనుగోలుదారు OTP నమోదు చేయండి",
    farmer_portal: "రైతు పోర్టల్",
    features: "ఫీచర్లు",
    features_title: "మా ఫీచర్లు",
    get_started: "ప్రారంభించండి",
    give_otp_to_agent: "ఏజెంట్‌కు OTP ఇవ్వండి",
    gst_charges: "GST ఛార్జీలు",
    hero_description:
        "రైతులు, కొనుగోలుదారులు మరియు వ్యవసాయ సలహాదారులను కలిపే సమగ్ర వేదిక.",
    item_subtotal: "ఐటమ్ ఉప మొత్తం",
    monthly_earnings: "నెలవారీ ఆదాయం",
    my_products: "నా ఉత్పత్తులు",
    orders_received: "అందుకున్న ఆర్డర్లు",
    query_subject: "ప్రశ్న విషయం",
    role_advisory: "వ్యవసాయ సలహాదారు",
    role_delivery: "డెలివరీ ఏజెంట్",
    save_changes: "మార్పులను సేవ్ చేయండి",
    secure_delivery: "సురక్షిత డెలివరీ",
    secure_delivery_desc:
        "వ్యవసాయ ఉత్పత్తుల నమ్మకమైన మరియు సురక్షితమైన డెలివరీ.",
    send_reply: "ప్రత్యుత్తరం పంపండి",
    stock_qty: "స్టాక్ పరిమాణం",
    upi_qr_code: "UPI QR కోడ్",
    verify_otp_deliver: "డెలివరీ కోసం OTPని ధృవీకరించండి",
    weather_widget_title: "వాతావరణం"
});

// Farmer Dashboard translations

Object.assign(translations.en, {
    direct_70_share: "Direct 70% share from delivered orders",
    listed_in_marketplace: "Listed in marketplace",
    from_district_buyers: "From district buyers",
    farm_district: "Farm District",
    local_hub: "Local Hub",

    weather_advisory: "Weather & Advisory",
    ask_agricultural_expert: "Ask Agricultural Expert",
    earnings: "Earnings",
    profile_upi_qr: "Profile & UPI QR",

    add_new_item: "+ Add New Item",
    order_date: "Order # / Date",
    buyer_info: "Buyer Info",
    ordered_produce: "Ordered Produce",
    amount: "Amount",
    status: "Status",
    delivery_otp: "Delivery OTP",
    assigned_agent: "Assigned Agent",
    action: "Action",

    revenue_chart: "Monthly Revenue Bar Chart",
    revenue_chart_description:
        "Visualizing your 70% direct crop revenue month-by-month",

    recent_farm_alerts: "Recent Farm Alerts",
    consult_agricultural_scientists: "Consult Agricultural Scientists",
    crop_name: "Crop Name",
    subject_problem: "Subject / Problem",
    detailed_symptoms: "Detailed Symptoms & Questions",
    ask_agronomist: "Ask Agronomist",
    my_questions_answers: "My Questions & Answers",
    registered_upi_id: "Registered UPI ID"
});

Object.assign(translations.hi, {
    direct_70_share: "डिलीवरी किए गए ऑर्डर से सीधे 70% हिस्सा",
    listed_in_marketplace: "मार्केटप्लेस में सूचीबद्ध",
    from_district_buyers: "जिले के खरीदारों से",
    farm_district: "कृषि जिला",
    local_hub: "स्थानीय केंद्र",

    weather_advisory: "मौसम और सलाह",
    ask_agricultural_expert: "कृषि विशेषज्ञ से पूछें",
    earnings: "आय",
    profile_upi_qr: "प्रोफ़ाइल और UPI QR",

    add_new_item: "+ नया आइटम जोड़ें",
    order_date: "ऑर्डर # / तारीख",
    buyer_info: "खरीदार की जानकारी",
    ordered_produce: "ऑर्डर किया गया उत्पाद",
    amount: "राशि",
    status: "स्थिति",
    delivery_otp: "डिलीवरी OTP",
    assigned_agent: "सौंपा गया एजेंट",
    action: "कार्रवाई",

    revenue_chart: "मासिक राजस्व बार चार्ट",
    revenue_chart_description:
        "महीने के अनुसार आपकी 70% प्रत्यक्ष फसल आय दिखाई जा रही है",

    recent_farm_alerts: "हाल के कृषि अलर्ट",
    consult_agricultural_scientists: "कृषि वैज्ञानिकों से परामर्श करें",
    crop_name: "फसल का नाम",
    subject_problem: "विषय / समस्या",
    detailed_symptoms: "विस्तृत लक्षण और प्रश्न",
    ask_agronomist: "कृषि विशेषज्ञ से पूछें",
    my_questions_answers: "मेरे प्रश्न और उत्तर",
    registered_upi_id: "पंजीकृत UPI ID"
});

Object.assign(translations.ta, {
    direct_70_share: "விநியோகிக்கப்பட்ட ஆர்டர்களிலிருந்து நேரடி 70% பங்கு",
    listed_in_marketplace: "சந்தையில் பட்டியலிடப்பட்டுள்ளது",
    from_district_buyers: "மாவட்ட வாங்குபவர்களிடமிருந்து",
    farm_district: "விவசாய மாவட்டம்",
    local_hub: "உள்ளூர் மையம்",

    weather_advisory: "வானிலை மற்றும் ஆலோசனை",
    ask_agricultural_expert: "வேளாண் நிபுணரிடம் கேளுங்கள்",
    earnings: "வருமானம்",
    profile_upi_qr: "சுயவிவரம் மற்றும் UPI QR",

    add_new_item: "+ புதிய பொருளைச் சேர்க்கவும்",
    order_date: "ஆர்டர் # / தேதி",
    buyer_info: "வாங்குபவர் தகவல்",
    ordered_produce: "ஆர்டர் செய்யப்பட்ட விளைபொருள்",
    amount: "தொகை",
    status: "நிலை",
    delivery_otp: "விநியோக OTP",
    assigned_agent: "ஒதுக்கப்பட்ட முகவர்",
    action: "செயல்",

    revenue_chart: "மாதாந்திர வருவாய் பட்டை விளக்கப்படம்",
    revenue_chart_description:
        "மாதம் வாரியாக உங்கள் 70% நேரடி பயிர் வருவாய் காட்டப்படுகிறது",

    recent_farm_alerts: "சமீபத்திய பண்ணை எச்சரிக்கைகள்",
    consult_agricultural_scientists: "வேளாண் விஞ்ஞானிகளிடம் ஆலோசனை பெறுங்கள்",
    crop_name: "பயிரின் பெயர்",
    subject_problem: "தலைப்பு / பிரச்சினை",
    detailed_symptoms: "விரிவான அறிகுறிகள் மற்றும் கேள்விகள்",
    ask_agronomist: "வேளாண் நிபுணரிடம் கேளுங்கள்",
    my_questions_answers: "எனது கேள்விகள் மற்றும் பதில்கள்",
    registered_upi_id: "பதிவு செய்யப்பட்ட UPI ID"
});

Object.assign(translations.te, {
    direct_70_share: "డెలివరీ చేసిన ఆర్డర్ల నుండి నేరుగా 70% వాటా",
    listed_in_marketplace: "మార్కెట్‌ప్లేస్‌లో జాబితా చేయబడింది",
    from_district_buyers: "జిల్లా కొనుగోలుదారుల నుండి",
    farm_district: "వ్యవసాయ జిల్లా",
    local_hub: "స్థానిక కేంద్రం",

    weather_advisory: "వాతావరణం & సలహా",
    ask_agricultural_expert: "వ్యవసాయ నిపుణుడిని అడగండి",
    earnings: "ఆదాయం",
    profile_upi_qr: "ప్రొఫైల్ & UPI QR",

    add_new_item: "+ కొత్త వస్తువును జోడించండి",
    order_date: "ఆర్డర్ # / తేదీ",
    buyer_info: "కొనుగోలుదారు సమాచారం",
    ordered_produce: "ఆర్డర్ చేసిన ఉత్పత్తి",
    amount: "మొత్తం",
    status: "స్థితి",
    delivery_otp: "డెలివరీ OTP",
    assigned_agent: "కేటాయించిన ఏజెంట్",
    action: "చర్య",

    revenue_chart: "నెలవారీ ఆదాయ బార్ చార్ట్",
    revenue_chart_description:
        "నెలవారీగా మీ 70% ప్రత్యక్ష పంట ఆదాయాన్ని చూపిస్తోంది",

    recent_farm_alerts: "ఇటీవలి వ్యవసాయ హెచ్చరికలు",
    consult_agricultural_scientists: "వ్యవసాయ శాస్త్రవేత్తలను సంప్రదించండి",
    crop_name: "పంట పేరు",
    subject_problem: "విషయం / సమస్య",
    detailed_symptoms: "వివరణాత్మక లక్షణాలు & ప్రశ్నలు",
    ask_agronomist: "వ్యవసాయ నిపుణుడిని అడగండి",
    my_questions_answers: "నా ప్రశ్నలు & సమాధానాలు",
    registered_upi_id: "నమోదు చేసిన UPI ID"
});

// ============================================================
// Farmer Dashboard - Dynamic Text
// ============================================================

Object.assign(translations.en, {

    no_products_listed: "You haven't listed any farm produce yet.",
    add_first_produce: "+ Add Your First Produce",
    stock: "Stock",
    edit: "Edit",

    failed_save_product: "Failed to save product",
    server_error_saving_product: "Server error saving product",

    add_fresh_produce: "Add Fresh Produce",
    edit_produce_listing: "Edit Produce Listing",

    remove_product_confirm:
        "Are you sure you want to remove this product from the marketplace?",
    product_deleted: "Product deleted",
    failed_delete_product: "Failed to delete product",

    no_orders_received: "No orders received yet.",
    accept_confirm: "✓ Accept & Confirm",
    pending_payment: "Pending Payment",
    searching_agent: "Searching agent...",
    your_share_70: "Your Share (70%)",

    order_accepted_stock_reduced:
        "Order accepted! Stock has been automatically reduced.",
    failed_accept_order: "Failed to accept order",
    server_error_accepting_order: "Server error accepting order",

    farmer_net_revenue: "Farmer 70% Net Revenue (₹)",
    revenue: "Revenue",

    your_query_submitted:
        "Your query has been submitted to agricultural experts!",
    failed_post_advisory: "Failed to post advisory query",
    no_advisory_questions:
        "You have not asked any advisory questions yet.",

    expert_response_from: "🌿 Expert Response from",
    agronomist: "Agronomist",
    replied_on: "Replied on",
    awaiting_reply_certified:
        "⏳ Awaiting reply from certified agricultural advisor...",

    not_registered: "Not registered",
    qr_code_unavailable: "QR code unavailable",
    upi_id_not_registered: "UPI ID not registered",

    no_new_notifications: "No new notifications"
});


Object.assign(translations.hi, {

    no_products_listed: "आपने अभी तक कोई कृषि उत्पाद सूचीबद्ध नहीं किया है।",
    add_first_produce: "+ अपना पहला उत्पाद जोड़ें",
    stock: "स्टॉक",
    edit: "संपादित करें",

    failed_save_product: "उत्पाद सहेजने में विफल",
    server_error_saving_product:
        "उत्पाद सहेजते समय सर्वर त्रुटि हुई",

    add_fresh_produce: "ताज़ा उत्पाद जोड़ें",
    edit_produce_listing: "उत्पाद सूची संपादित करें",

    remove_product_confirm:
        "क्या आप वाकई इस उत्पाद को मार्केटप्लेस से हटाना चाहते हैं?",
    product_deleted: "उत्पाद हटा दिया गया",
    failed_delete_product: "उत्पाद हटाने में विफल",

    no_orders_received: "अभी तक कोई ऑर्डर प्राप्त नहीं हुआ है।",
    accept_confirm: "✓ स्वीकार करें और पुष्टि करें",
    pending_payment: "भुगतान लंबित",
    searching_agent: "एजेंट खोजा जा रहा है...",
    your_share_70: "आपका हिस्सा (70%)",

    order_accepted_stock_reduced:
        "ऑर्डर स्वीकार किया गया! स्टॉक अपने आप कम कर दिया गया है।",
    failed_accept_order: "ऑर्डर स्वीकार करने में विफल",
    server_error_accepting_order:
        "ऑर्डर स्वीकार करते समय सर्वर त्रुटि हुई",

    farmer_net_revenue: "किसान 70% शुद्ध आय (₹)",
    revenue: "आय",

    your_query_submitted:
        "आपका प्रश्न कृषि विशेषज्ञों को भेज दिया गया है!",
    failed_post_advisory: "कृषि सलाह प्रश्न भेजने में विफल",
    no_advisory_questions:
        "आपने अभी तक कोई कृषि सलाह प्रश्न नहीं पूछा है।",

    expert_response_from: "🌿 विशेषज्ञ का उत्तर:",
    agronomist: "कृषि विशेषज्ञ",
    replied_on: "उत्तर दिया गया",
    awaiting_reply_certified:
        "⏳ प्रमाणित कृषि सलाहकार के उत्तर की प्रतीक्षा है...",

    not_registered: "पंजीकृत नहीं है",
    qr_code_unavailable: "QR कोड उपलब्ध नहीं है",
    upi_id_not_registered: "UPI ID पंजीकृत नहीं है",

    no_new_notifications: "कोई नई सूचना नहीं"
});


Object.assign(translations.ta, {

    no_products_listed:
        "நீங்கள் இன்னும் எந்த வேளாண் பொருளையும் பட்டியலிடவில்லை.",
    add_first_produce: "+ உங்கள் முதல் விளைபொருளைச் சேர்க்கவும்",
    stock: "கையிருப்பு",
    edit: "திருத்து",

    failed_save_product: "பொருளைச் சேமிக்க முடியவில்லை",
    server_error_saving_product:
        "பொருளைச் சேமிக்கும் போது சேவையகப் பிழை ஏற்பட்டது",

    add_fresh_produce: "புதிய விளைபொருளைச் சேர்க்கவும்",
    edit_produce_listing: "விளைபொருள் பட்டியலைத் திருத்தவும்",

    remove_product_confirm:
        "இந்த பொருளை சந்தையிலிருந்து அகற்ற விரும்புகிறீர்களா?",
    product_deleted: "பொருள் நீக்கப்பட்டது",
    failed_delete_product: "பொருளை நீக்க முடியவில்லை",

    no_orders_received: "இதுவரை ஆர்டர்கள் எதுவும் பெறப்படவில்லை.",
    accept_confirm: "✓ ஏற்கவும் மற்றும் உறுதிப்படுத்தவும்",
    pending_payment: "பணம் செலுத்துதல் நிலுவையில் உள்ளது",
    searching_agent: "முகவர் தேடப்படுகிறது...",
    your_share_70: "உங்கள் பங்கு (70%)",

    order_accepted_stock_reduced:
        "ஆர்டர் ஏற்கப்பட்டது! கையிருப்பு தானாகக் குறைக்கப்பட்டது.",
    failed_accept_order: "ஆர்டரை ஏற்க முடியவில்லை",
    server_error_accepting_order:
        "ஆர்டரை ஏற்கும் போது சேவையகப் பிழை ஏற்பட்டது",

    farmer_net_revenue: "விவசாயியின் 70% நிகர வருவாய் (₹)",
    revenue: "வருவாய்",

    your_query_submitted:
        "உங்கள் கேள்வி வேளாண் நிபுணர்களுக்கு அனுப்பப்பட்டது!",
    failed_post_advisory: "ஆலோசனை கேள்வியை அனுப்ப முடியவில்லை",
    no_advisory_questions:
        "நீங்கள் இன்னும் எந்த ஆலோசனை கேள்வியையும் கேட்கவில்லை.",

    expert_response_from: "🌿 நிபுணரின் பதில்:",
    agronomist: "வேளாண் நிபுணர்",
    replied_on: "பதிலளிக்கப்பட்ட தேதி",
    awaiting_reply_certified:
        "⏳ சான்றளிக்கப்பட்ட வேளாண் ஆலோசகரின் பதிலுக்காக காத்திருக்கிறது...",

    not_registered: "பதிவு செய்யப்படவில்லை",
    qr_code_unavailable: "QR குறியீடு கிடைக்கவில்லை",
    upi_id_not_registered: "UPI ID பதிவு செய்யப்படவில்லை",

    no_new_notifications: "புதிய அறிவிப்புகள் இல்லை"
});


Object.assign(translations.te, {

    no_products_listed:
        "మీరు ఇంకా ఎలాంటి వ్యవసాయ ఉత్పత్తిని జాబితా చేయలేదు.",
    add_first_produce: "+ మీ మొదటి ఉత్పత్తిని జోడించండి",
    stock: "స్టాక్",
    edit: "సవరించండి",

    failed_save_product: "ఉత్పత్తిని సేవ్ చేయడం విఫలమైంది",
    server_error_saving_product:
        "ఉత్పత్తిని సేవ్ చేస్తున్నప్పుడు సర్వర్ లోపం",

    add_fresh_produce: "తాజా ఉత్పత్తిని జోడించండి",
    edit_produce_listing: "ఉత్పత్తి జాబితాను సవరించండి",

    remove_product_confirm:
        "ఈ ఉత్పత్తిని మార్కెట్‌ప్లేస్ నుండి తొలగించాలనుకుంటున్నారా?",
    product_deleted: "ఉత్పత్తి తొలగించబడింది",
    failed_delete_product: "ఉత్పత్తిని తొలగించడం విఫలమైంది",

    no_orders_received: "ఇంకా ఎలాంటి ఆర్డర్లు అందలేదు.",
    accept_confirm: "✓ అంగీకరించి నిర్ధారించండి",
    pending_payment: "చెల్లింపు పెండింగ్‌లో ఉంది",
    searching_agent: "ఏజెంట్ కోసం వెతుకుతోంది...",
    your_share_70: "మీ వాటా (70%)",

    order_accepted_stock_reduced:
        "ఆర్డర్ అంగీకరించబడింది! స్టాక్ స్వయంచాలకంగా తగ్గించబడింది.",
    failed_accept_order: "ఆర్డర్‌ను అంగీకరించడం విఫలమైంది",
    server_error_accepting_order:
        "ఆర్డర్‌ను అంగీకరించేటప్పుడు సర్వర్ లోపం",

    farmer_net_revenue: "రైతు 70% నికర ఆదాయం (₹)",
    revenue: "ఆదాయం",

    your_query_submitted:
        "మీ ప్రశ్న వ్యవసాయ నిపుణులకు పంపబడింది!",
    failed_post_advisory: "వ్యవసాయ సలహా ప్రశ్నను పంపడం విఫలమైంది",
    no_advisory_questions:
        "మీరు ఇంకా ఎలాంటి వ్యవసాయ సలహా ప్రశ్నను అడగలేదు.",

    expert_response_from: "🌿 నిపుణుల సమాధానం:",
    agronomist: "వ్యవసాయ నిపుణుడు",
    replied_on: "సమాధానం ఇచ్చిన తేదీ",
    awaiting_reply_certified:
        "⏳ ధృవీకరించబడిన వ్యవసాయ సలహాదారు సమాధానం కోసం వేచి ఉంది...",

    not_registered: "నమోదు చేయబడలేదు",
    qr_code_unavailable: "QR కోడ్ అందుబాటులో లేదు",
    upi_id_not_registered: "UPI ID నమోదు చేయబడలేదు",

    no_new_notifications: "కొత్త నోటిఫికేషన్లు లేవు"
});

// ============================================================
// BUYER DASHBOARD - Additional Static Text
// ============================================================

Object.assign(translations.en, {
    current_district: "Current District",
    consult_plant_advisory: "Consult Plant Advisory",

    all_districts: "All Districts",
    vegetables: "Vegetables",
    fruits: "Fruits",
    grains_pulses: "Grains & Pulses",
    spices: "Spices",
    organic_goods: "Organic Foods",

    order_date_farmer: "Order # / Date",
    items_purchased: "Items Purchased",
    total_bill: "Total Bill",

    ask_agricultural_guidance: "Ask Agricultural Guidance",
    plant_produce_area: "Plant / Produce Area",
    topic_question_title: "Topic / Question Title",
    details: "Details",
    submit_to_advisory: "Submit to Advisory",
    previous_answers: "Previous Answers",

    checkout_payment: "Checkout & Payment",
    choose_payment_method: "Choose Payment Method",
    upi_qr_payment: "UPI QR Payment",
    pay_directly_farmer_upi: "Pay directly to the farmer using UPI",
    pay_delivery_agent: "Pay the delivery agent at your doorstep",
    scan_farmer_upi: "Scan Farmer's UPI QR Code",
    scan_using_apps: "✓ Scan using Google Pay, PhonePe, Paytm or BHIM",
    contact_phone: "Contact Phone",
    house_street_landmark: "House/Flat No, Street, Landmark",
    enter_10_digit_phone: "Enter 10-digit phone number",
    upi_reference_optional: "UPI Reference / UTR Number",
    optional: "Optional",
    enter_upi_reference: "Enter UPI reference after payment",
    transaction_reference_after_payment:
        "You can enter the transaction reference after completing the UPI payment.",
    confirm_order_generate_otp: "Confirm Order & Generate OTP",

    complete_upi_payment: "Complete UPI Payment",
    upi_transaction_reference_optional: "UPI Transaction Reference (Optional)",
    enter_12_digit_utr: "Enter 12-digit UTR number",
    verify_payment_generate_otp: "Verify Payment & Generate OTP",

    order_received: "Order Received!",
    order_confirmed_with_farmer:
        "has been confirmed with the farmer!",
    secure_delivery_otp: "YOUR SECURE DELIVERY OTP:",
    payment_verified_share_otp:
        "✓ Payment verified. Share this OTP with the delivery agent only after receiving your items to confirm delivery!",
    cash_on_delivery_order: "CASH ON DELIVERY ORDER",
    cod_otp_message:
        "Your secure Delivery OTP will be generated as soon as payment is made (Cash or UPI scan at your doorstep with the delivery agent).",
    total_payable: "Total Payable",
    view_my_orders: "View My Orders",

    farmer: "Farmer",
    buyer: "Buyer"
});


Object.assign(translations.hi, {
    current_district: "वर्तमान जिला",
    consult_plant_advisory: "पौध सलाह लें",

    all_districts: "सभी जिले",
    vegetables: "सब्ज़ियाँ",
    fruits: "फल",
    grains_pulses: "अनाज और दालें",
    spices: "मसाले",
    organic_goods: "जैविक उत्पाद",

    order_date_farmer: "ऑर्डर # / तारीख",
    items_purchased: "खरीदे गए उत्पाद",
    total_bill: "कुल बिल",

    ask_agricultural_guidance: "कृषि मार्गदर्शन पूछें",
    plant_produce_area: "पौधा / उत्पाद क्षेत्र",
    topic_question_title: "विषय / प्रश्न शीर्षक",
    details: "विवरण",
    submit_to_advisory: "सलाह के लिए भेजें",
    previous_answers: "पिछले उत्तर",

    checkout_payment: "चेकआउट और भुगतान",
    choose_payment_method: "भुगतान विधि चुनें",
    upi_qr_payment: "UPI QR भुगतान",
    pay_directly_farmer_upi: "UPI का उपयोग करके सीधे किसान को भुगतान करें",
    pay_delivery_agent: "अपने घर पर डिलीवरी एजेंट को भुगतान करें",
    scan_farmer_upi: "किसान का UPI QR कोड स्कैन करें",
    scan_using_apps: "✓ Google Pay, PhonePe, Paytm या BHIM से स्कैन करें",
    contact_phone: "संपर्क फोन",
    house_street_landmark: "घर/फ्लैट नंबर, सड़क, लैंडमार्क",
    enter_10_digit_phone: "10 अंकों का फोन नंबर दर्ज करें",
    upi_reference_optional: "UPI संदर्भ / UTR नंबर",
    optional: "वैकल्पिक",
    enter_upi_reference: "भुगतान के बाद UPI संदर्भ दर्ज करें",
    transaction_reference_after_payment:
        "UPI भुगतान पूरा करने के बाद लेनदेन संदर्भ दर्ज कर सकते हैं।",
    confirm_order_generate_otp: "ऑर्डर की पुष्टि करें और OTP जनरेट करें",

    complete_upi_payment: "UPI भुगतान पूरा करें",
    upi_transaction_reference_optional: "UPI लेनदेन संदर्भ (वैकल्पिक)",
    enter_12_digit_utr: "12 अंकों का UTR नंबर दर्ज करें",
    verify_payment_generate_otp: "भुगतान सत्यापित करें और OTP जनरेट करें",

    order_received: "ऑर्डर प्राप्त हुआ!",
    order_confirmed_with_farmer: "किसान के साथ पुष्टि की गई है!",
    secure_delivery_otp: "आपका सुरक्षित डिलीवरी OTP:",
    payment_verified_share_otp:
        "✓ भुगतान सत्यापित। सामान प्राप्त करने के बाद ही यह OTP डिलीवरी एजेंट के साथ साझा करें!",
    cash_on_delivery_order: "कैश ऑन डिलीवरी ऑर्डर",
    cod_otp_message:
        "भुगतान किए जाने के बाद आपका सुरक्षित डिलीवरी OTP जनरेट होगा।",
    total_payable: "कुल देय राशि",
    view_my_orders: "मेरे ऑर्डर देखें",

    farmer: "किसान",
    buyer: "खरीदार"
});


Object.assign(translations.ta, {
    current_district: "தற்போதைய மாவட்டம்",
    consult_plant_advisory: "தாவர ஆலோசனையைப் பெறுங்கள்",

    all_districts: "அனைத்து மாவட்டங்கள்",
    vegetables: "காய்கறிகள்",
    fruits: "பழங்கள்",
    grains_pulses: "தானியங்கள் மற்றும் பருப்புகள்",
    spices: "மசாலா பொருட்கள்",
    organic_goods: "இயற்கை பொருட்கள்",

    order_date_farmer: "ஆர்டர் # / தேதி",
    items_purchased: "வாங்கிய பொருட்கள்",
    total_bill: "மொத்த பில்",

    ask_agricultural_guidance: "வேளாண் வழிகாட்டுதலைக் கேளுங்கள்",
    plant_produce_area: "தாவரம் / விளைபொருள் பகுதி",
    topic_question_title: "தலைப்பு / கேள்வி பெயர்",
    details: "விவரங்கள்",
    submit_to_advisory: "ஆலோசனைக்கு சமர்ப்பிக்கவும்",
    previous_answers: "முந்தைய பதில்கள்",

    checkout_payment: "செக்அவுட் மற்றும் பணம் செலுத்துதல்",
    choose_payment_method: "பணம் செலுத்தும் முறையைத் தேர்ந்தெடுக்கவும்",
    upi_qr_payment: "UPI QR பணம் செலுத்துதல்",
    pay_directly_farmer_upi: "UPI மூலம் விவசாயிக்கு நேரடியாக பணம் செலுத்துங்கள்",
    pay_delivery_agent: "உங்கள் வீட்டில் விநியோக முகவருக்கு பணம் செலுத்துங்கள்",
    scan_farmer_upi: "விவசாயியின் UPI QR குறியீட்டை ஸ்கேன் செய்யவும்",
    scan_using_apps: "✓ Google Pay, PhonePe, Paytm அல்லது BHIM மூலம் ஸ்கேன் செய்யவும்",
    contact_phone: "தொடர்பு தொலைபேசி",
    house_street_landmark: "வீடு/பிளாட் எண், தெரு, அடையாள இடம்",
    enter_10_digit_phone: "10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்",
    upi_reference_optional: "UPI குறிப்பு / UTR எண்",
    optional: "விருப்பத்தேர்வு",
    enter_upi_reference: "பணம் செலுத்திய பிறகு UPI குறிப்பை உள்ளிடவும்",
    transaction_reference_after_payment:
        "UPI பணம் செலுத்திய பிறகு பரிவர்த்தனை குறிப்பை உள்ளிடலாம்.",
    confirm_order_generate_otp:
        "ஆர்டரை உறுதிப்படுத்தி OTP உருவாக்கவும்",

    complete_upi_payment: "UPI பணம் செலுத்துதலை முடிக்கவும்",
    upi_transaction_reference_optional:
        "UPI பரிவர்த்தனை குறிப்பு (விருப்பத்தேர்வு)",
    enter_12_digit_utr: "12 இலக்க UTR எண்ணை உள்ளிடவும்",
    verify_payment_generate_otp:
        "பணத்தைச் சரிபார்த்து OTP உருவாக்கவும்",

    order_received: "ஆர்டர் பெறப்பட்டது!",
    order_confirmed_with_farmer: "விவசாயியுடன் உறுதிப்படுத்தப்பட்டுள்ளது!",
    secure_delivery_otp: "உங்கள் பாதுகாப்பான விநியோக OTP:",
    payment_verified_share_otp:
        "✓ பணம் சரிபார்க்கப்பட்டது. பொருட்களைப் பெற்ற பிறகு மட்டுமே இந்த OTP-ஐ விநியோக முகவருடன் பகிரவும்!",
    cash_on_delivery_order: "விநியோகத்தின் போது பணம் செலுத்தும் ஆர்டர்",
    cod_otp_message:
        "பணம் செலுத்தியவுடன் உங்கள் பாதுகாப்பான விநியோக OTP உருவாக்கப்படும்.",
    total_payable: "செலுத்த வேண்டிய மொத்த தொகை",
    view_my_orders: "எனது ஆர்டர்களைப் பார்க்கவும்",

    farmer: "விவசாயி",
    buyer: "வாங்குபவர்"
});


Object.assign(translations.te, {
    current_district: "ప్రస్తుత జిల్లా",
    consult_plant_advisory: "మొక్కల సలహా పొందండి",

    all_districts: "అన్ని జిల్లాలు",
    vegetables: "కూరగాయలు",
    fruits: "పండ్లు",
    grains_pulses: "ధాన్యాలు మరియు పప్పులు",
    spices: "మసాలాలు",
    organic_goods: "సేంద్రీయ ఉత్పత్తులు",

    order_date_farmer: "ఆర్డర్ # / తేదీ",
    items_purchased: "కొనుగోలు చేసిన వస్తువులు",
    total_bill: "మొత్తం బిల్లు",

    ask_agricultural_guidance: "వ్యవసాయ మార్గదర్శకత్వాన్ని అడగండి",
    plant_produce_area: "మొక్క / ఉత్పత్తి ప్రాంతం",
    topic_question_title: "విషయం / ప్రశ్న శీర్షిక",
    details: "వివరాలు",
    submit_to_advisory: "సలహాకు సమర్పించండి",
    previous_answers: "మునుపటి సమాధానాలు",

    checkout_payment: "చెక్అవుట్ & చెల్లింపు",
    choose_payment_method: "చెల్లింపు పద్ధతిని ఎంచుకోండి",
    upi_qr_payment: "UPI QR చెల్లింపు",
    pay_directly_farmer_upi: "UPI ద్వారా రైతుకు నేరుగా చెల్లించండి",
    pay_delivery_agent: "మీ ఇంటి వద్ద డెలివరీ ఏజెంట్‌కు చెల్లించండి",
    scan_farmer_upi: "రైతు UPI QR కోడ్‌ను స్కాన్ చేయండి",
    scan_using_apps: "✓ Google Pay, PhonePe, Paytm లేదా BHIM ఉపయోగించి స్కాన్ చేయండి",
    contact_phone: "సంప్రదింపు ఫోన్",
    house_street_landmark: "ఇల్లు/ఫ్లాట్ నంబర్, వీధి, ల్యాండ్‌మార్క్",
    enter_10_digit_phone: "10 అంకెల ఫోన్ నంబర్ నమోదు చేయండి",
    upi_reference_optional: "UPI రిఫరెన్స్ / UTR నంబర్",
    optional: "ఐచ్ఛికం",
    enter_upi_reference: "చెల్లింపు తర్వాత UPI రిఫరెన్స్ నమోదు చేయండి",
    transaction_reference_after_payment:
        "UPI చెల్లింపు పూర్తయిన తర్వాత లావాదేవీ రిఫరెన్స్ నమోదు చేయవచ్చు.",
    confirm_order_generate_otp:
        "ఆర్డర్‌ను నిర్ధారించి OTP రూపొందించండి",

    complete_upi_payment: "UPI చెల్లింపును పూర్తి చేయండి",
    upi_transaction_reference_optional:
        "UPI లావాదేవీ రిఫరెన్స్ (ఐచ్ఛికం)",
    enter_12_digit_utr: "12 అంకెల UTR నంబర్ నమోదు చేయండి",
    verify_payment_generate_otp:
        "చెల్లింపును ధృవీకరించి OTP రూపొందించండి",

    order_received: "ఆర్డర్ అందుకుంది!",
    order_confirmed_with_farmer: "రైతుతో నిర్ధారించబడింది!",
    secure_delivery_otp: "మీ సురక్షిత డెలివరీ OTP:",
    payment_verified_share_otp:
        "✓ చెల్లింపు ధృవీకరించబడింది. వస్తువులు అందుకున్న తర్వాత మాత్రమే ఈ OTPని డెలివరీ ఏజెంట్‌తో పంచుకోండి!",
    cash_on_delivery_order: "క్యాష్ ఆన్ డెలివరీ ఆర్డర్",
    cod_otp_message:
        "చెల్లింపు చేసిన వెంటనే మీ సురక్షిత డెలివరీ OTP రూపొందించబడుతుంది.",
    total_payable: "చెల్లించాల్సిన మొత్తం",
    view_my_orders: "నా ఆర్డర్లను చూడండి",

    farmer: "రైతు",
    buyer: "కొనుగోలుదారు"
});

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
    // Make sure the requested language exists
    if (!translations[langCode]) {
        langCode = "en";
    }

    // Save selected language
    localStorage.setItem("agromarket_lang", langCode);

    // ------------------------------------------------------------
    // Translate normal text elements
    // Example:
    // <span data-i18n="home">Home</span>
    // ------------------------------------------------------------
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
        const key = element.getAttribute("data-i18n");

        if (key) {
            element.textContent = t(key);
        }
    });

    // ------------------------------------------------------------
    // Translate placeholders
    // Example:
    // <input data-i18n-placeholder="enter_name">
    // ------------------------------------------------------------
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
        const key = element.getAttribute("data-i18n-placeholder");

        if (key) {
            element.setAttribute("placeholder", t(key));
        }
    });

    // ------------------------------------------------------------
    // Translate title attributes
    // Example:
    // <button data-i18n-title="delete">
    // ------------------------------------------------------------
    document.querySelectorAll("[data-i18n-title]").forEach(function (element) {
        const key = element.getAttribute("data-i18n-title");

        if (key) {
            element.setAttribute("title", t(key));
        }
    });

    // ------------------------------------------------------------
    // Update language selector
    // ------------------------------------------------------------
    const languageSelect = document.getElementById("lang-select");

    if (languageSelect) {
        languageSelect.value = langCode;
    }

    // ------------------------------------------------------------
    // Notify other JavaScript files
    // ------------------------------------------------------------
    document.dispatchEvent(
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

document.addEventListener("DOMContentLoaded", function () {

    // Load the previously selected language
    const savedLanguage = getCurrentLang();
    applyLanguage(savedLanguage);

    // Get language selector
    const languageSelect = document.getElementById("lang-select");

    if (languageSelect) {

        // Change language when user selects an option
        languageSelect.addEventListener("change", function (event) {
            const selectedLanguage = event.target.value;

            console.log("Language selected:", selectedLanguage);

            applyLanguage(selectedLanguage);
        });

    } else {
        console.warn("Language selector #lang-select was not found.");
    }
});