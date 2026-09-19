/**
 * AgroMarket Multilingual Translation Dictionary
 * Languages: English (en), Hindi (hi), Tamil (ta), Telugu (te)
 */

const translations = {
  en: {
    // Nav & Common
    platform_name: "AgroMarket",
    tagline: "Direct Farm Marketplace & Advisory",
    home: "Home",
    marketplace: "Marketplace",
    advisory: "Advisory",
    login: "Login",
    register: "Register",
    logout: "Logout",
    dashboard: "Dashboard",
    language: "Language",
    profile: "Profile",
    view_details: "View Details",
    status: "Status",
    actions: "Actions",
    confirm: "Confirm",
    cancel: "Cancel",
    save_changes: "Save Changes",
    close: "Close",

    // Roles
    role_farmer: "Farmer",
    role_buyer: "Buyer",
    role_delivery: "Delivery Agent",
    role_advisory: "Advisory Expert",

    // Farmer Dashboard
    farmer_portal: "Farmer Portal",
    add_product: "Add New Product",
    my_products: "My Products",
    orders_received: "Orders Received",
    monthly_earnings: "Monthly Earnings",
    accept_order: "Accept Order",
    order_accepted: "Accepted",
    product_name: "Product Name",
    category: "Category",
    price: "Price",
    stock_qty: "Available Stock (kg/units)",
    description: "Description",
    weather_widget_title: "Agricultural Weather Forecast",
    otp_label: "Delivery OTP",
    upi_qr_code: "My UPI QR Code",

    // Buyer Dashboard
    buyer_portal: "Buyer Marketplace",
    all_districts: "All Districts",
    filter_by_district: "Filter by District",
    search_produce: "Search fresh crops & produce...",
    cart: "Cart",
    checkout: "Checkout",
    cash_on_delivery: "Cash on Delivery (COD)",
    upi_pay: "Pay via Farmer UPI QR",
    item_subtotal: "Produce Total",
    gst_charges: "GST (5%)",
    delivery_fee: "Delivery Charges",
    platform_fee: "Platform Fee",
    grand_total: "Total Payable",
    order_now: "Confirm & Place Order",
    my_orders: "My Orders",
    give_otp_to_agent: "Give this OTP to Delivery Agent upon arrival:",

    // Delivery Agent Dashboard
    delivery_portal: "Delivery Agent Portal",
    available_pickups: "Available Deliveries",
    active_deliveries: "My Active Deliveries",
    pickup_address: "Pickup from Farmer",
    dropoff_address: "Deliver to Buyer",
    open_in_maps: "Open in Google Maps",
    mark_picked_up: "Mark Picked Up",
    verify_otp_deliver: "Verify OTP & Deliver",
    enter_buyer_otp: "Enter 6-Digit Buyer OTP",
    delivery_payout: "30% Delivery Payout",
    bank_details: "Bank Payout Account",

    // Advisory Dashboard
    advisory_portal: "Agricultural Advisory Panel",
    ask_query: "Ask Advisory Question",
    query_subject: "Crop / Issue Subject",
    crop_type: "Crop Type",
    describe_issue: "Describe symptoms or questions...",
    submit_question: "Submit to Advisory",
    all_queries: "Farmer & Buyer Queries",
    answer_query: "Reply with Guidance",
    write_reply: "Provide scientific or organic recommendations...",
    send_reply: "Send Expert Reply",

    // Statuses
    status_placed: "Placed",
    status_accepted: "Accepted by Farmer",
    status_pickup: "Picked Up",
    status_delivering: "Out for Delivery",
    status_delivered: "Delivered",
    payment_completed: "Paid",
    payment_pending: "Payment Pending"
  },

  hi: {
    // Nav & Common
    platform_name: "एग्रोमार्केट",
    tagline: "सीधा किसान बाज़ार और कृषि सलाह",
    home: "होम",
    marketplace: "बाज़ार",
    advisory: "कृषि सलाह",
    login: "लॉग इन",
    register: "पंजीकरण",
    logout: "लॉग आउट",
    dashboard: "डैशबोर्ड",
    language: "भाषा",
    profile: "प्रोफ़ाइल",
    view_details: "विवरण देखें",
    status: "स्थिति",
    actions: "कार्यवाही",
    confirm: "पुष्टि करें",
    cancel: "रद्द करें",
    save_changes: "परिवर्तन सहेजें",
    close: "बंद करें",

    // Roles
    role_farmer: "किसान",
    role_buyer: "खरीदार",
    role_delivery: "डिलीवरी एजेंट",
    role_advisory: "कृषि सलाहकार",

    // Farmer Dashboard
    farmer_portal: "किसान पोर्टल",
    add_product: "नया उत्पाद जोड़ें",
    my_products: "मेरे उत्पाद",
    orders_received: "प्राप्त ऑर्डर",
    monthly_earnings: "मासिक कमाई",
    accept_order: "ऑर्डर स्वीकार करें",
    order_accepted: "स्वीकार किया गया",
    product_name: "उत्पाद का नाम",
    category: "श्रेणी",
    price: "मूल्य",
    stock_qty: "उपलब्ध मात्रा (किग्रा/इकाई)",
    description: "विवरण",
    weather_widget_title: "कृषि मौसम पूर्वानुमान",
    otp_label: "डिलीवरी ओटीपी",
    upi_qr_code: "मेरा यूपीआई क्यूआर कोड",

    // Buyer Dashboard
    buyer_portal: "खरीदार बाज़ार",
    all_districts: "सभी जिले",
    filter_by_district: "जिले के अनुसार खोजें",
    search_produce: "ताज़ा फसल और उत्पाद खोजें...",
    cart: "कार्ट",
    checkout: "चेकआउट",
    cash_on_delivery: "कैश ऑन डिलीवरी (COD)",
    upi_pay: "किसान यूपीआई क्यूआर से भुगतान",
    item_subtotal: "उत्पाद कुल",
    gst_charges: "जीएसटी (5%)",
    delivery_fee: "डिलीवरी शुल्क",
    platform_fee: "प्लेटफ़ॉर्म शुल्क",
    grand_total: "कुल भुगतान राशि",
    order_now: "ऑर्डर दें",
    my_orders: "मेरे ऑर्डर",
    give_otp_to_agent: "सामान मिलने पर डिलीवरी एजेंट को यह ओटीपी दें:",

    // Delivery Agent Dashboard
    delivery_portal: "डिलीवरी एजेंट पोर्टल",
    available_pickups: "उपलब्ध डिलीवरी",
    active_deliveries: "सक्रिय डिलीवरी",
    pickup_address: "किसान से उठाएं",
    dropoff_address: "खरीदार को पहुंचाएं",
    open_in_maps: "गूगल मैप्स में देखें",
    mark_picked_up: "उठाया गया मार्क करें",
    verify_otp_deliver: "ओटीपी सत्यापित करें और डिलीवर करें",
    enter_buyer_otp: "खरीदार का 6-अंकीय ओटीपी दर्ज करें",
    delivery_payout: "30% डिलीवरी कमीशन",
    bank_details: "बैंक खाता विवरण",

    // Advisory Dashboard
    advisory_portal: "कृषि सलाहकार पैनल",
    ask_query: "कृषि प्रश्न पूछें",
    query_subject: "फसल / समस्या का विषय",
    crop_type: "फसल का प्रकार",
    describe_issue: "समस्या या लक्षण लिखें...",
    submit_question: "सलाहकार को भेजें",
    all_queries: "किसानों और खरीदारों के प्रश्न",
    answer_query: "मार्गदर्शन दें",
    write_reply: "जैविक या वैज्ञानिक उपाय लिखें...",
    send_reply: "उत्तर भेजें",

    // Statuses
    status_placed: "ऑर्डर प्राप्त",
    status_accepted: "किसान द्वारा स्वीकृत",
    status_pickup: "उठाया गया",
    status_delivering: "डिलीवरी के लिए निकला",
    status_delivered: "डिलीवर हो गया",
    payment_completed: "भुगतान पूर्ण",
    payment_pending: "भुगतान लंबित"
  },

  ta: {
    // Nav & Common
    platform_name: "அக்ரோமார்க்கெட்",
    tagline: "நேரடி உழவர் சந்தை & வேளாண் ஆலோசனை",
    home: "முகப்பு",
    marketplace: "சந்தை",
    advisory: "வேளாண் ஆலோசனை",
    login: "உள்நுழைக",
    register: "பதிவு செய்க",
    logout: "வெளியேறு",
    dashboard: "டாஷ்போர்டு",
    language: "மொழி",
    profile: "சுயவிவரம்",
    view_details: "விவரங்களை காண்க",
    status: "நிலை",
    actions: "செயல்கள்",
    confirm: "உறுதி செய்",
    cancel: "ரத்து செய்",
    save_changes: "சேமி",
    close: "மூடு",

    // Roles
    role_farmer: "விவசாயி",
    role_buyer: "வாங்குபவர்",
    role_delivery: "டெலிவரி ஏஜென்ட்",
    role_advisory: "வேளாண் ஆலோசகர்",

    // Farmer Dashboard
    farmer_portal: "விவசாயி தளம்",
    add_product: "புதிய பயிர்/பொருள் சேர்",
    my_products: "என் விளைபொருட்கள்",
    orders_received: "வந்த ஆர்டர்கள்",
    monthly_earnings: "மாதாந்திர வருமானம்",
    accept_order: "ஆர்டரை ஏற்றுக்கொள்",
    order_accepted: "ஏற்றுக்கொள்ளப்பட்டது",
    product_name: "பொருள் பெயர்",
    category: "பிரிவு",
    price: "விலை",
    stock_qty: "இருப்பு அளவு (கிலோ/எண்ணிக்கை)",
    description: "விளக்கம்",
    weather_widget_title: "வேளாண் வானிலை முன்னறிவிப்பு",
    otp_label: "டெலிவரி OTP",
    upi_qr_code: "என் UPI QR குறியீடு",

    // Buyer Dashboard
    buyer_portal: "வாங்குபவர் சந்தை",
    all_districts: "அனைத்து மாவட்டங்கள்",
    filter_by_district: "மாவட்டம் வாரியாக தேடுக",
    search_produce: "புதிய பயிர்கள் மற்றும் காய்கறிகளை தேடுக...",
    cart: "கார்ட்",
    checkout: "செக்அவுட்",
    cash_on_delivery: "பொருள் பெற்றபின் பணம் (COD)",
    upi_pay: "விவசாயி UPI QR மூலம் செலுத்துக",
    item_subtotal: "பொருட்களின் மொத்த விலை",
    gst_charges: "ஜி.எஸ்.டி (5%)",
    delivery_fee: "டெலிவரி கட்டணம்",
    platform_fee: "தள கட்டணம்",
    grand_total: "செலுத்த வேண்டிய மொத்த தொகை",
    order_now: "ஆர்டர் செய்க",
    my_orders: "என் ஆர்டர்கள்",
    give_otp_to_agent: "பொருட்கள் கிடைத்ததும் டெலிவரி ஊழியரிடம் இந்த OTP-ஐ கூறவும்:",

    // Delivery Agent Dashboard
    delivery_portal: "டெலிவரி ஏஜென்ட் தளம்",
    available_pickups: "எடுக்க வேண்டிய ஆர்டர்கள்",
    active_deliveries: "தற்போதைய டெலிவரிகள்",
    pickup_address: "விவசாயியிடம் எடுக்கும் இடம்",
    dropoff_address: "வாங்குபவரிடம் சேர்க்கும் இடம்",
    open_in_maps: "கூகிள் வரைபடத்தில் காண்க",
    mark_picked_up: "பொருள் எடுக்கப்பட்டது",
    verify_otp_deliver: "OTP சரிபார்த்து டெலிவரி செய்க",
    enter_buyer_otp: "வாங்குபவரின் 6-இலக்க OTP உள்ளிடவும்",
    delivery_payout: "30% டெலிவரி வருமானம்",
    bank_details: "வங்கி கணக்கு விவரம்",

    // Advisory Dashboard
    advisory_portal: "வேளாண் ஆலோசனை தளம்",
    ask_query: "விவசாய சந்தேகம் கேட்க",
    query_subject: "பயிர் / பிரச்சனையின் தலைப்பு",
    crop_type: "பயிர் வகை",
    describe_issue: "அறிகுறிகள் அல்லது கேள்விகளை எழுதுங்கள்...",
    submit_question: "ஆலோசகருக்கு அனுப்புக",
    all_queries: "விவசாயிகள் மற்றும் நுகர்வோர் கேள்விகள்",
    answer_query: "வழிகாட்டல் வழங்கவும்",
    write_reply: "இயற்கை அல்லது அறிவியல் தீர்வுகளை எழுதுக...",
    send_reply: "பதிலை அனுப்புக",

    // Statuses
    status_placed: "ஆர்டர் செய்யப்பட்டது",
    status_accepted: "விவசாயியால் ஏற்கப்பட்டது",
    status_pickup: "எடுக்கப்பட்டது",
    status_delivering: "டெலிவரிக்கு செல்கிறது",
    status_delivered: "டெலிவரி முடிந்தது",
    payment_completed: "செலுத்தப்பட்டது",
    payment_pending: "நிலுவையில் உள்ளது"
  },

  te: {
    // Nav & Common
    platform_name: "అగ్రోమార్కెట్",
    tagline: "రైతు మార్కెట్ & వ్యవసాయ సలహాలు",
    home: "హోమ్",
    marketplace: "మార్కెట్",
    advisory: "వ్యవసాయ సలహాలు",
    login: "లాగిన్",
    register: "రిజిస్టర్",
    logout: "లాగ్ అవుట్",
    dashboard: "డ్యాష్‌బోర్డ్",
    language: "భాష",
    profile: "ప్రొఫైల్",
    view_details: "వివరాలు చూడండి",
    status: "స్థితి",
    actions: "చర్యలు",
    confirm: "నిర్ధారించండి",
    cancel: "రద్దు చేయండి",
    save_changes: "మార్పులను సేవ్ చేయండి",
    close: "మూసివేయి",

    // Roles
    role_farmer: "రైతు",
    role_buyer: "కొనుగోలుదారు",
    role_delivery: "డెలివరీ ఏజెంట్",
    role_advisory: "వ్యవసాయ నిపుణులు",

    // Farmer Dashboard
    farmer_portal: "రైతు పోర్టల్",
    add_product: "కొత్త పంట/ఉత్పత్తిని జోడించండి",
    my_products: "నా ఉత్పత్తులు",
    orders_received: "వచ్చిన ఆర్డర్లు",
    monthly_earnings: "నెలవారీ ఆదాయం",
    accept_order: "ఆర్డర్‌ను ఆమోదించండి",
    order_accepted: "ఆమోదించబడింది",
    product_name: "ఉత్పత్తి పేరు",
    category: "వర్గం",
    price: "ధర",
    stock_qty: "అందుబాటులో ఉన్న పరిమాణం (కేజీలు/యూనిట్లు)",
    description: "వివరణ",
    weather_widget_title: "వ్యవసాయ వాతావరణ సమాచారం",
    otp_label: "డెలివరీ OTP",
    upi_qr_code: "నా UPI QR కోడ్",

    // Buyer Dashboard
    buyer_portal: "కొనుగోలుదారు మార్కెట్",
    all_districts: "అన్ని జిల్లాలు",
    filter_by_district: "జిల్లా వారీగా ఫిల్టర్ చేయండి",
    search_produce: "తాజా పంటలు & ఉత్పత్తుల కోసం వెతకండి...",
    cart: "కార్ట్",
    checkout: "చెక్‌అవుట్",
    cash_on_delivery: "క్యాష్ ఆన్ డెలివరీ (COD)",
    upi_pay: "రైతు UPI QR ద్వారా చెల్లించండి",
    item_subtotal: "ఉత్పత్తుల మొత్తం",
    gst_charges: "GST (5%)",
    delivery_fee: "డెలివరీ ఛార్జీలు",
    platform_fee: "ప్లాట్‌ఫారమ్ ఛార్జీ",
    grand_total: "మొత్తం చెల్లించాల్సిన సొమ్ము",
    order_now: "ఆర్డర్ చేయండి",
    my_orders: "నా ఆర్డర్లు",
    give_otp_to_agent: "సరుకులు అందిన తర్వాత డెలివరీ ఏజెంట్‌కు ఈ OTP ఇవ్వండి:",

    // Delivery Agent Dashboard
    delivery_portal: "డెలివరీ ఏజెంట్ పోర్టల్",
    available_pickups: "అందుబాటులో ఉన్న డెలివరీలు",
    active_deliveries: "నా యాక్టివ్ డెలివరీలు",
    pickup_address: "రైతు వద్ద పికప్ స్థలం",
    dropoff_address: "కొనుగోలుదారు డెలివరీ స్థలం",
    open_in_maps: "గూగుల్ మ్యాప్స్‌లో తెరవండి",
    mark_picked_up: "పికప్ పూర్తయింది",
    verify_otp_deliver: "OTP ధృవీకరించి డెలివరీ పూర్తి చేయండి",
    enter_buyer_otp: "కొనుగోలుదారు 6-అంకెల OTP నమోదు చేయండి",
    delivery_payout: "30% డెలివరీ ఆదాయం",
    bank_details: "బ్యాంక్ ఖాతా వివరాలు",

    // Advisory Dashboard
    advisory_portal: "వ్యవసాయ సలహా మండలి",
    ask_query: "వ్యవసాయ ప్రశ్న అడగండి",
    query_subject: "పంట / సమస్య అంశం",
    crop_type: "పంట రకం",
    describe_issue: "సమస్య లేదా లక్షణాలను వివరించండి...",
    submit_question: "సలహాదారుకు పంపండి",
    all_queries: "రైతులు & కొనుగోలుదారుల ప్రశ్నలు",
    answer_query: "సలహా ఇవ్వండి",
    write_reply: "శాస్త్రీయ లేదా సేంద్రీయ పరిష్కారం రాయండి...",
    send_reply: "సమాధానం పంపండి",

    // Statuses
    status_placed: "ఆర్డర్ చేయబడింది",
    status_accepted: "రైతు ఆమోదించారు",
    status_pickup: "పికప్ చేయబడింది",
    status_delivering: "డెలివరీకి బయలుదేరింది",
    status_delivered: "డెలివరీ పూర్తయింది",
    payment_completed: "చెల్లింపు పూర్తయింది",
    payment_pending: "చెల్లింపు పెండింగ్‌లో ఉంది"
  }
};

/**
 * Applies translations to all DOM elements that have data-i18n attribute
 */
function applyLanguage(langCode) {
  if (!translations[langCode]) {
    langCode = 'en';
  }
  localStorage.setItem('agromarket_lang', langCode);

  const dict = translations[langCode];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Update select element if present
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = langCode;
  }
}

function getCurrentLang() {
  return localStorage.getItem('agromarket_lang') || 'en';
}

function t(key) {
  const lang = getCurrentLang();
  return (translations[lang] && translations[lang][key]) || translations['en'][key] || key;
}
