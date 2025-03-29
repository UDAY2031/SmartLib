"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentActivities = [
  {
    id: 1,
    user: "User 1",
    action: "Check out",
    book: "Programming in ANSI C",
    author: "Balagurusamy E",
    time: "10 minutes ago",
  },
  {
    id: 2,
    user: "User 2",
    action: "Return",
    book: "Higher Engineering Mathematics",
    author: "Grewal B S",
    time: "25 minutes ago",
  },
  {
    id: 3,
    user: "User 3",
    action: "Renew",
    book: "Data Communications and Networking",
    author: "Forouzan",
    time: "1 hour ago",
  },
  {
    id: 4,
    user: "User 4",
    action: "Check out",
    book: "Machine Learning",
    author: "Mitchell, Tom M.",
    time: "2 hours ago",
  },
  {
    id: 5,
    user: "User 5",
    action: "Return",
    book: "Artificial Intelligence",
    author: "Russell Stuart",
    time: "3 hours ago",
  },
]

export default function RecentActivity() {
  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">{activity.user.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{activity.user}</p>
              <Badge
                variant={
                  activity.action === "Check out" ? "default" : activity.action === "Return" ? "secondary" : "outline"
                }
                className="ml-auto"
              >
                {activity.action}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.book} by {activity.author}
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

