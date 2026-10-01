import { Card,Statistic,Button } from "antd"

export const MonthlyTargetCard = () =>(
    <Card title="Monthly Target" extra={<Button type="primary">Learn More</Button>}>
            <Statistic value={87} suffix="/ 100" />
            <p className="text-sm text-gray-500 mt-2">You're close to reaching your monthly target!</p>
          </Card>
)