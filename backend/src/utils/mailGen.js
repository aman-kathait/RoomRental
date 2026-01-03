import Mailgen from "mailgen";

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Room Rental",
    link: "http://localhost:5173/",
  },
});

export default mailGenerator;
