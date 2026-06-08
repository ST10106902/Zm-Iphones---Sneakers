export const saveOrder = (orderData) => {
    try {
        const existingOrders = JSON.parse(localStorage.getItem('zm_orders') || '[]');
        localStorage.setItem('zm_orders', JSON.stringify([orderData, ...existingOrders]));
        return true;
    } catch (error) {
        console.error("Error saving order:", error);
        return false;
    }
};

export const getOrders = () => {
    try {
        return JSON.parse(localStorage.getItem('zm_orders') || '[]');
    } catch (error) {
        console.error("Error getting orders:", error);
        return [];
    }
};

export const updateOrderStatus = (orderId, newStatus) => {
    try {
        const orders = getOrders();
        const updated = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        localStorage.setItem('zm_orders', JSON.stringify(updated));
        return true;
    } catch (error) {
        console.error("Error updating order status:", error);
        return false;
    }
};

export const deleteOrder = (orderId) => {
    try {
        const orders = getOrders();
        const filtered = orders.filter(order => order.id !== orderId);
        localStorage.setItem('zm_orders', JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error("Error deleting order:", error);
        return false;
    }
};

export const getSettings = () => {
    try {
        const defaultSettings = {
            web3formsKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
            notificationEmail: 'admin@zmstore.com'
        };
        const saved = localStorage.getItem('zm_settings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch (error) {
        console.error("Error getting settings:", error);
        return { web3formsKey: '', notificationEmail: 'admin@zmstore.com' };
    }
};

export const saveSettings = (settings) => {
    try {
        localStorage.setItem('zm_settings', JSON.stringify(settings));
        return true;
    } catch (error) {
        console.error("Error saving settings:", error);
        return false;
    }
};

export const sendOrderEmail = async (orderData) => {
    const settings = getSettings();
    const accessKey = settings.web3formsKey;

    const itemsText = orderData.items
        .map(item => `- ${item.name} (Qty: ${item.quantity}) @ R${item.price.toLocaleString()} = R${(item.price * item.quantity).toLocaleString()}`)
        .join('\n');

    const message = `
New Order Received!
----------------------------------
Order Reference: ${orderData.id}
Date: ${new Date(orderData.date).toLocaleString('en-ZA')}
Total Amount: R${orderData.total.toLocaleString()}

[Customer Details]
Name: ${orderData.customer.firstName} ${orderData.customer.lastName || ''}
Email: ${orderData.customer.email}
Phone: ${orderData.customer.phone}
Address: ${orderData.customer.address}, ${orderData.customer.city || ''}

[Items Ordered]
${itemsText}

----------------------------------
Manage this order in your ZM Store Admin Dashboard.
`;

    if (!accessKey) {
        console.warn("Web3Forms access key not set. Email notification simulated.");
        console.log("Simulated Email Payload:\n", message);
        return { success: false, simulated: true, message: "Email simulation active (Access Key missing)" };
    }

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: accessKey,
                subject: `New ZM Store Order: ${orderData.id}`,
                from_name: "ZM Store Checkout",
                name: `${orderData.customer.firstName} ${orderData.customer.lastName || ''}`,
                email: orderData.customer.email,
                message: message
            })
        });

        const data = await response.json();
        if (data.success) {
            console.log("Email sent successfully via Web3Forms.");
            return { success: true, message: "Email sent successfully" };
        } else {
            console.error("Web3Forms integration returned error:", data.message);
            return { success: false, error: data.message };
        }
    } catch (error) {
        console.error("Error sending email via Web3Forms:", error);
        return { success: false, error: error.message };
    }
};
