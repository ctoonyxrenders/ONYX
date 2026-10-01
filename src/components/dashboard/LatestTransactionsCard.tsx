import { Card,Dropdown,Space,Avatar,Tag,Table, } from "antd"
import {UserAddOutlined, EllipsisOutlined,PlusOutlined,StopOutlined } from "@ant-design/icons";

const newMemberMenuItems = [
    {
      key: 'AddAll',
      icon: <PlusOutlined />,
      label: "Add all",
    },
    {
      key: 'DisableAll',
      icon: <StopOutlined />,
      label: "Disable all",
    },
  ];

const transactions = [
    { id: 1, name: "Alex Carter", date: "2025-08-06", amount: "$1,200", status: "Approved", avatarColor: "#f56a00" },
    { id: 2, name: "Sandra Hall", date: "2025-08-05", amount: "$950", status: "Pending", avatarColor: "#7265e6" },
    { id: 3, name: "Tom Cook", date: "2025-08-03", amount: "$670", status: "Rejected", avatarColor: "#ffbf00" },
  ];

export const LatestTransactionsCard = () =>(
    <Card
            title="Latest Transactions"
            extra={
                <Dropdown menu={{ items: newMemberMenuItems }} trigger={['click']} placement="bottomRight">
                <a onClick={(e) => e.preventDefault()}>
                  <EllipsisOutlined />
                </a>
              </Dropdown>
              
            }
          >
            <Table
              columns={[
                {
                  title: 'Customer',
                  dataIndex: 'name',
                  render: (text, record) => (
                    <Space>
                      <Avatar style={{ backgroundColor: record.avatarColor }}>
                        {text[0]}
                      </Avatar>
                      <span>{text}</span>
                    </Space>
                  ),
                },
                { title: 'Date', dataIndex: 'date' },
                { title: 'Amount', dataIndex: 'amount' },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  render: (text) => (
                    <Tag color={
                      text === 'Approved' ? 'green' :
                      text === 'Pending' ? 'blue' : 'volcano'
                    }>
                      {text}
                    </Tag>
                  ),
                  align: 'right',
                },
              ]}
              dataSource={transactions}
              rowKey="id"
              pagination={false}
            />
          </Card>
)