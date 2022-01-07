interface ListaLeads {
    count: Number;
    next: String;
    results: [Leads];
};

interface Leads {
    id: Number;
    score: Number;
    vehicles_names: [];
    client_name: any;
    client_surname?: any;
    client_phone: any;
    channel: any;
    origin: any;
    result: String;
    user_data: any;
    lead_managements_data: [manejo]
}

interface manejo {
    id: Number,
    message: String,
    status: String,
    event: String,
    user_data: userData,
    created: Date
}

interface userData {
    id: 20,
    first_name: String,
    last_name: String,
    phone: Number,
    username: String,
    email: String,
    is_online: Boolean,
    lost_calls: Boolean,
    emails_received: Boolean
}
