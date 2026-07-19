import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Image as ImageIcon,
    Calendar,
    Newspaper,
    Plus,
    Eye,
    History,
    CheckCircle,
    AlertCircle,
    Group,
    Handshake,
    ShieldCheck,
    BriefcaseBusinessIcon,
    Star,
    Trophy,
    TrophyIcon
} from 'lucide-react';

export default function Admin() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("adminLoggedIn");
        navigate("/");
    };

    // Modules configuration
    const modules = [
        { title: "Gallery", desc: "Manage gallery images", icon: ImageIcon },
        { title: "News", desc: "Manage news articles", icon: Newspaper },
        { title: "Social Work", desc: "Manage social work", icon: Handshake },
        { title: "Sponsors", desc: "Manage sponsors", icon: ShieldCheck },
        { title: "Awards", desc: "Manage awards", icon: TrophyIcon },
    ];

    // Recent activity logs
    const logs = [
        {
            id: 1,
            action: "New event 'Annual Gathering 2026' published",
            user: "Admin (Rahul)",
            time: "10 mins ago",
            type: "success"
        },
        {
            id: 2,
            action: "Updated member profiles in directory",
            user: "Editor (Amit)",
            time: "2 hours ago",
            type: "success"
        },
        {
            id: 3,
            action: "Deleted 2 outdated images from gallery",
            user: "Admin (Rahul)",
            time: "Yesterday",
            type: "info"
        },
    ];
    return (
        <div className="min-h-screen bg-gray-50/60 font-sans">
            <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">

                {/* TOP HEADER TITLE */}
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 tracking-tight">
                            Admin Dashboard
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Welcome back! Manage your platform parameters easily below.
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>

                </div>

                {/* INTERACTIVE MODULE CARDS */}
                <div>
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                        Quick Management
                    </h2>
                    {/* Grid setup dynamically handles the 3 remaining columns gracefully */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {modules.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-emerald-600 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-800">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-6">{item.desc}</p>
                                    </div>

                                    {/* Action row at bottom of card */}
                                    <div className="flex items-center gap-2 border-t border-gray-100 pt-4 mt-auto">
                                        <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 py-2.5 rounded-lg transition-colors">
                                            <Eye className="w-3.5 h-3.5" /> View All
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 py-2.5 rounded-lg transition-colors shadow-sm">
                                            <Plus className="w-3.5 h-3.5" /> Add New
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* AUDIT HISTORY LOGS */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                        <History className="w-5 h-5 text-gray-500" />
                        <h3 className="text-base font-bold text-gray-800">Recent System Activity</h3>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {logs.map((log) => (
                            <div key={log.id} className="flex items-start justify-between py-3.5 px-2 hover:bg-gray-50/50 rounded-lg transition-colors">
                                <div className="flex gap-3">
                                    {log.type === 'success' ? (
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    ) : (
                                        <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-700 font-medium">{log.action}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">By {log.user}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-gray-400 shrink-0 ml-4">{log.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}