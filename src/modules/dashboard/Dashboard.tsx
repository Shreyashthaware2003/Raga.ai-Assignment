import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsOptions, healthcareUpcoming, } from '@/mockData/dashboard'
import { ArrowRight, Calendars } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();

    const dashboardCards = analyticsOptions;
    const { highlight, items } = healthcareUpcoming;
    const HighlightIcon = highlight.icon;

    return (
        <>
            <div className='flex flex-col gap-6 space-y-6'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-4xl font-bold'>Dashboard Overview</h1>
                    <span>Overview of implemented modules: analytics, patient registry, authentication, and alert demo</span>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
                    {dashboardCards.map((option) => {
                        const Icon = option.icon;
                        return (
                            <Card key={option.title} className="hover:shadow-lg transition-shadow card-surface ring-0 space-y-2">
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-lg ${option.bgColor} flex items-center justify-center mb-4`}>
                                        <Icon className={`h-6 w-6 ${option.color}`} />
                                    </div>
                                    <CardTitle>{option.title}</CardTitle>
                                    <CardDescription>{option.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8 relative">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-muted-foreground">Key Features:</p>
                                        <ul className="space-y-1">
                                            {option.features.map((feature) => (
                                                <li key={feature} className="text-sm flex items-center gap-2">
                                                    <span className={`h-1.5 w-1.5 rounded-full bg-blue-600`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Button
                                        onClick={() => navigate(option.href)}
                                        className="w-full border border-gray-300 dark:border-[#302f2f] hover:bg-gray-200/50 dark:hover:bg-[#302f2f]/50 "
                                        variant="outline"
                                    >
                                        {option.cta ?? "Open Module"}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                <div className='opacity-40 dark:opacity-20 space-y-4 cursor-default select-none'>
                    <h1 className='flex items-center flex-nowrap gap-1 text-xs'><Calendars className='w-4 h-4' />Upcoming features</h1>

                    <Card className="rounded-xl overflow-hidden card-surface ring-0 ">
                        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2">
                            <div className="p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r dark:border-[#302f2f] border-gray-300">
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 bg-gray-300 dark:bg-[#302f2f]">
                                    <HighlightIcon className="h-6 w-6 text-primary" />
                                </div>

                                <h3 className="text-lg font-semibold mb-1">
                                    {highlight.title}
                                </h3>

                                <p className="text-sm text-muted-foreground mb-4">
                                    {highlight.description}
                                </p>

                                <Button variant="link" className="p-0 h-auto w-fit cursor-default">
                                    {highlight.cta}
                                </Button>
                            </div>
                            <div className="p-6 space-y-6">
                                {items.map((item, index) => {
                                    const ItemIcon = item.icon;

                                    return (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="w-20 shrink-0 text-sm text-muted-foreground">
                                                <p className="font-medium">{item.label}</p>
                                                <p>{item.date}</p>
                                            </div>

                                            <div className="w-px bg-border h-full" />

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <ItemIcon className="h-4 w-4 text-muted-foreground" />
                                                    <p className="text-sm font-medium">{item.title}</p>
                                                </div>

                                                <p className="text-xs text-muted-foreground mb-2">
                                                    {item.subtitle}
                                                </p>

                                                {item.action && (
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        className="h-7 text-xs cursor-default"
                                                    >
                                                        {item.action}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Dashboard
