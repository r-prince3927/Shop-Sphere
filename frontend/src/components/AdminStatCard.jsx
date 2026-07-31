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

            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"

        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium uppercase tracking-wide text-gray-500">

                        {title}

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">

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