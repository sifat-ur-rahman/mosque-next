function DashboardHome() {
    const stats = [
        {
            title: 'Total Users',
            value: '2,543',
            change: '+12.5%',
        },
        {
            title: 'Revenue',
            value: '$45,231',
            change: '+8.2%',
        },
        {
            title: 'Active Sessions',
            value: '1,234',
            change: '+4.3%',
        },
        {
            title: 'Growth Rate',
            value: '23.5%',
            change: '+2.1%',
        },
    ];
    return (
        <div>
            {' '}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-white">
                    Welcome Back!
                </h1>
                <p className="text-[#b8b8b8]">
                    Here's what's happening with your dashboard today.
                </p>
            </div>
            {/* Stats Grid */}
            <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-lg border border-[#4a3464] bg-[#3a2454] p-6"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-[#b8b8b8]">
                                {stat.title}
                            </h3>
                            <svg
                                className="h-5 w-5 text-[#d4af37]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {stat.value}
                        </div>
                        <p className="mt-1 text-xs text-[#d4af37]">
                            {stat.change} from last month
                        </p>
                    </div>
                ))}
            </div>
            {/* Content Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-[#4a3464] bg-[#3a2454] p-6">
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Recent Activity
                    </h3>
                    <p className="mb-4 text-sm text-[#b8b8b8]">
                        Your latest updates and changes
                    </p>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="mt-2 h-2 w-2 rounded-full bg-[#d4af37]" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">
                                        Activity Item {i}
                                    </p>
                                    <p className="text-xs text-[#b8b8b8]">
                                        2 hours ago
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border border-[#4a3464] bg-[#3a2454] p-6">
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Quick Actions
                    </h3>
                    <p className="mb-4 text-sm text-[#b8b8b8]">
                        Frequently used features
                    </p>
                    <div className="space-y-2">
                        {['Create New', 'View Reports', 'Manage Settings'].map(
                            (action) => (
                                <button
                                    key={action}
                                    className="w-full rounded-lg bg-[#4a3464] px-4 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-[#d4af37] hover:text-[#29173f]"
                                >
                                    {action}
                                </button>
                            ),
                        )}
                    </div>
                </div>

                <div className="rounded-lg border border-[#4a3464] bg-[#3a2454] p-6">
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        System Status
                    </h3>
                    <p className="mb-4 text-sm text-[#b8b8b8]">
                        Current system health
                    </p>
                    <div className="space-y-3">
                        {['API Status', 'Database', 'Storage'].map((system) => (
                            <div
                                key={system}
                                className="flex items-center justify-between"
                            >
                                <span className="text-sm text-white">
                                    {system}
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-[#d4af37]" />
                                    <span className="text-xs text-[#d4af37]">
                                        Operational
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;
