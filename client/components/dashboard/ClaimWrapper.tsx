import {
  Phone,
  MailOutline,
  Search,
  FilterAltOutlined,
  ExpandCircleDownOutlined,
  AssignmentOutlined,
  FileOpenOutlined,
  PostAddOutlined,
  TaskOutlined,
  ContentPasteGoOutlined,
} from "@mui/icons-material";


const ClaimWrapper = ({
  type,
  name,
  info,
  action = null,
}: {
  type: string;
  name: string;
  info: string;
  action: { e_name: string; time_stamp: string; remarks: string } | null;
}) => {
  //the action attribute in history must match the defined action type
  const iconMap: any = {
    forward: <ContentPasteGoOutlined sx={{ fontSize: 36, marginRight: 0.5 }} />,
    outward: <TaskOutlined sx={{ fontSize: 40 }} />,
    inward: <FileOpenOutlined sx={{ fontSize: 40 }} />,
    new: <PostAddOutlined sx={{ fontSize: 40 }} />,
    stage: <AssignmentOutlined sx={{ fontSize: 40 }} />,
  };
  const icon = iconMap[type] || null;
  return (
    <div className="flex flex-row place-content-between hover:bg-zinc-100 p-2 rounded">
      <div className="flex flex-row items-center">
        {icon}
        <div className="flex flex-col ml-2 font-semibold">
          <p>{name}</p>
          <p className="text-zinc-500">{info}</p>
        </div>
      </div>
      {action !== null && (
        <div className="flex-col text-zinc-500 font-semibold items-end hidden sm:flex">
          <span className="flex flex-row">
            <p className="text-zinc-900">{action?.e_name}&nbsp;</p>
            <p> at {action?.time_stamp}</p>
          </span>
          <p>{action?.remarks}</p>
        </div>
      )}
    </div>
  );
};

export default ClaimWrapper;
