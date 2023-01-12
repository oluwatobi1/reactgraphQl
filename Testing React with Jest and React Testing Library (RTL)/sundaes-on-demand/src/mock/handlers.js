import {rest} from "msw";

export default const handlers = [
    rest.get("http://localhost:8080/scoops", (req, res, context)=>{
            return res(
                context.json([
                    { name: "Chocolate", imagePath:"/images/chocolate.png"},
                    { name: "Vanilla    ", imagePath:"/images/vanilla.png"},
                ])
            )
    })
]