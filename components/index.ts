import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/blocs/chart"), { ssr: false });

import { Chat } from "@/components/blocs/chat";
import { Start } from "@/components/welcome/start";
import { Join } from "@/components/welcome/join";
import { Info } from "@/components/blocs/info";
import { Rank } from "@/components/blocs/rank";
export { Chart, Chat, Start, Join, Info, Rank };
