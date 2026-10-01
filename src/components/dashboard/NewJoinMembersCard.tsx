import { Card,Dropdown,Space,Avatar,Button } from "antd"
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

  const newMembers = [
    { id: 1, name: "John Doe", title: "Frontend Developer", img: "" },
    { id: 2, name: "Jane Smith", title: "Backend Developer", img: "" },
  ];  

export const NewJoinMembersCard = () =>(
    <Card
            title="New Join Members"
            extra={
                <Dropdown menu={{ items: newMemberMenuItems }} trigger={['click']} placement="bottomRight">
                <a onClick={(e) => e.preventDefault()}>
                  <EllipsisOutlined />
                </a>
              </Dropdown>
              
            }
          >
            {newMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between mb-4">
                <Space>
                  <Avatar>{member.name[0]}</Avatar>
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.title}</div>
                  </div>
                </Space>
                <Button size="small" icon={<UserAddOutlined />}>Add</Button>
              </div>
            ))}
          </Card>
)