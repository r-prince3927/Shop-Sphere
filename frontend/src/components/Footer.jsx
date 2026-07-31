import {
    Mail,
    Phone,
    MapPin,
    Globe,
    ArrowRight,
} from "lucide-react";

function Footer() {

    return (

        <footer className="mt-20 bg-gray-900 text-gray-300">

            <div className="mx-auto max-w-7xl px-6 py-14">

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Company */}

                    <div>

                        <h2 className="mb-5 text-3xl font-bold text-white">

                            ShopSphere

                        </h2>

                        <p className="leading-7">

                            ShopSphere is your trusted destination for premium
                            electronics, modern gadgets, and a seamless
                            shopping experience built using React and Django.

                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="mb-5 text-xl font-semibold text-white">

                            Quick Links

                        </h3>

                        <ul className="space-y-4">

                            <li className="flex items-center gap-2 hover:text-blue-400 transition">

                                <ArrowRight size={16} />

                                Home

                            </li>

                            <li className="flex items-center gap-2 hover:text-blue-400 transition">

                                <ArrowRight size={16} />

                                Products

                            </li>

                            <li className="flex items-center gap-2 hover:text-blue-400 transition">

                                <ArrowRight size={16} />

                                Cart

                            </li>

                            <li className="flex items-center gap-2 hover:text-blue-400 transition">

                                <ArrowRight size={16} />

                                Orders

                            </li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-5 text-xl font-semibold text-white">

                            Contact

                        </h3>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3">

                                <Mail size={18} />

                                support@shopsphere.com

                            </div>

                            <div className="flex items-center gap-3">

                                <Phone size={18} />

                                +91 98765 43210

                            </div>

                            <div className="flex items-center gap-3">

                                <MapPin size={18} />

                                Bhubaneswar, Odisha

                            </div>

                        </div>

                    </div>

                    {/* Website */}

                    <div>

                        <h3 className="mb-5 text-xl font-semibold text-white">

                            Website

                        </h3>

                        <button className="flex items-center gap-3 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">

                            <Globe size={20} />

                            Visit ShopSphere

                        </button>

                    </div>

                </div>

                <hr className="my-10 border-gray-700" />

                <div className="text-center text-gray-400">

                    © 2026 ShopSphere. All Rights Reserved.

                </div>

            </div>

        </footer>

    );

}

export default Footer;