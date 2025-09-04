import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient().$extends({
    query: {
        user: {
            async $allOperations({operation, args, query}: any) {
                if (
                    ['create', 'update'].includes(operation) &&
                    args.data?.password &&
                    !args.data.password.startsWith('$2b$') // crude check if already hashed
                ) {
                    args.data.password = await bcrypt.hash(args.data.password, 10)
                }

                return query(args)
            },
        },
    },
})

export default prisma
