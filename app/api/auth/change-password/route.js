import { ConnectDB } from "@/libs/mongo";
import { messages } from "@/utils/messajes";
import { headers } from "next/headers";
const { NextResponse } = require("next/server");
import jwt from "jsonwebtoken"
import User from "@/models/Users";
import bcrypt from "bcryptjs"

export async function POST(request) {
    try {
        const body = await request.json()
        const { newPassword, confirmPassword } = body

        if (!newPassword || !confirmPassword) {
            return NextResponse.json({ message: messages.error.faltanCredenciales },
                { status: 400 }
            )
        }

        await ConnectDB()
        const headerList = headers()
        const token = headerList.get("token")

        if (!token) {
            return NextResponse.json({
                message: messages.error.noAutorizado
            }, {
                status: 400
            })
        }

        try {
            const isTokenValid = jwt.verify(token, "secreto")
            const { data } = isTokenValid
            const userFind = await User.findById(data.userId)

            if (!userFind) {
                return NextResponse.json({
                    message: messages.error.usuarioNoRegistrado
                }, {
                    status: 400
                })
            }

            if (newPassword !== confirmPassword) {
                return NextResponse.json({
                    message: messages.error.noMatch
                })
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12)

            userFind.password = hashedPassword

            await userFind.save()

            return NextResponse.json({
                message : messages.success.editPassword
            },{
                status : 200
            })

        } catch (error) {
            console.log(error)
            return NextResponse.json({
                message : messages.error.invalidToken
            },{
                status: 400
            })
        }

    } catch (error) {
        return NextResponse.json({
            message : messages.error.defaultError
        },{
            status: 400
        })
    }
} 