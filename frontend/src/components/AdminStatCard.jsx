import { motion } from "framer-motion";

function AdminStatCard({

    title,

    value,

    icon,

    color,

}) {

    return (

        <motion.div

            whileHover={{ scale: 1.03 }}

            className="rounded-2xl bg-white p-6 shadow"

        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-gray-500">

                        {title}

                    </p>

                    <h2 className="mt-3 text-4xl font-bold">

                        {value}

                    </h2>

                </div>

                <div

                    className={`rounded-full p-4 ${color}`}

                >

                    {icon}

                </div>

            </div>

        </motion.div>

    );

}

export default AdminStatCard;