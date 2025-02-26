import {HandCoins, Handshake, Phone, Lock } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-white text-black py-10 mt-[120px]">
            <div className="container mx-auto max-w-7xl px-4 text-center md:text-left">
                <h2 className="text-2xl font-bold text-center mb-6">Platform Belanja Online Terpercaya</h2>
                <div className="border-t-2 border-black w-16 mx-auto mb-8"></div>
                
                {/* Grid Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-black text-sm">
                    {/* Column 1 */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-black text-3xl"><HandCoins/></div>
                        <h3 className="font-bold mt-2">RECHARGE REPEAT CUSTOMERS</h3>
                        <p>Save customers' cards for future phone orders</p>
                        <a href="#" className="text-black mt-2 flex items-center">LEARN MORE &rarr;</a>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-black text-3xl"><Handshake /></div>
                        <h3 className="font-bold mt-2">ACCEPT ELECTRONIC CHECKS</h3>
                        <p>Accept signatures for electronic ACH payments</p>
                        <a href="#" className="text-black mt-2 flex items-center">LEARN MORE &rarr;</a>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-black text-3xl"><Phone /></div>
                        <h3 className="font-bold mt-2">STREAMLINE PHONE PAYMENTS</h3>
                        <p>Set a schedule and get paid on time</p>
                        <a href="#" className="text-black mt-2 flex items-center">LEARN MORE &rarr;</a>
                    </div>

                    {/* Column 4 */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-black text-3xl"><Lock /></div>
                        <h3 className="font-bold mt-2">STAY SECURE</h3>
                        <p>Achieve PCI Level 1 Compliance</p>
                        <a href="#" className="text-black mt-2 flex items-center">LEARN MORE &rarr;</a>
                    </div>
                </div>

                {/* Contact & Social Media */}
                <div className="mt-10 flex flex-col items-center md:flex-row md:justify-between text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-red-400 text-xl"><Phone /></span>
                        <span className="text-lg font-semibold">800-601-0230</span>
                    </div>

                    {/* <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <span>FOLLOW US ON SOCIAL MEDIA</span>
                        <a href="#" className="text-gray-400 text-xl hover:text-white">📘</a>
                        <a href="#" className="text-gray-400 text-xl hover:text-white">📷</a>
                        <a href="#" className="text-gray-400 text-xl hover:text-white">🔗</a>
                        <a href="#" className="text-gray-400 text-xl hover:text-white">🐦</a>
                    </div> */}
                </div>

                {/* Footer Info */}
                <div className="text-center text-gray-500 text-xs mt-6">
                    PayJunction is a Level 1 PCI Compliant Provider. &copy; 2017 PayJunction. All rights reserved. 
                    <br />
                    <a href="#" className="underline">Privacy Policy</a> | <a href="#" className="underline">Terms of Use</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
