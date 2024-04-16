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
import Link from "next/link";




const ClaimWrapper = ({
  type,
  name,
  info,
  meta_id,
  action = null,
}: {
  type: string;
  name: string;
  info: string;
  meta_id:string;
  action: { e_name: string; time_stamp: string; remarks: string } | null;
}) => {
  //the action attribute in history must match the defined action type
  const iconMap: any = {
    forward: <ContentPasteGoOutlined sx={{ fontSize: 36, marginRight: 0.5 }} />,
    outward: <TaskOutlined sx={{ fontSize: 40 }} />,
    inward: <FileOpenOutlined sx={{ fontSize: 38 }} />,
    new: <PostAddOutlined sx={{ fontSize: 40 }} />,
    stage: <AssignmentOutlined sx={{ fontSize: 40 }} />,
  };
  const icon = iconMap[type] || null;

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <Link href={`/claimInfo/${meta_id}`}>
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
            <p>{formatTimestamp(action?.time_stamp)}</p>
          </span>
          <p>{action?.remarks}</p>
        </div>
      )}
    </div>
    </Link>
  );
};

export default ClaimWrapper;
