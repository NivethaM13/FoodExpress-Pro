def chatbot_reply(message:str):


    text = message.lower()



    # Order Assistance

    if "order" in text:

        return {

            "response":
            "You can check your order status from My Orders 📦",

            "category":
            "ORDER_ASSISTANCE"

        }




    # Restaurant Search

    elif "restaurant" in text or "nearby" in text:

        return {

            "response":
            "You can find available restaurants from Restaurant Search 🍔",

            "category":
            "RESTAURANT_SEARCH"

        }





    # Delivery Query

    elif "delivery" in text or "track" in text:

        return {

            "response":
            "Your delivery status can be tracked from Track Order 🚴",

            "category":
            "DELIVERY_QUERY"

        }





    # Refund Assistance

    elif "refund" in text:

        return {

            "response":
            "Refund requests will be processed within 5-7 working days 💰",

            "category":
            "REFUND_ASSISTANCE"

        }





    # Food Search

    elif "menu" in text or "food" in text:

        return {

            "response":
            "You can explore our Food Menu 🍔 and choose your favourite dishes.",

            "category":
            "FOOD_SEARCH"

        }





    # Cancellation

    elif "cancel" in text:

        return {

            "response":
            "You can request order cancellation from My Orders before preparation starts.",

            "category":
            "ORDER_CANCEL"

        }





    # FAQ Support

    elif "payment" in text or "help" in text:

        return {

            "response":
            "I can help you with orders, payments, delivery and refunds 🤖",

            "category":
            "FAQ_SUPPORT"

        }





    # Default

    else:

        return {

            "response":
            "Sorry, I didn't understand. Please ask about orders, delivery or refunds.",

            "category":
            "GENERAL"

        }