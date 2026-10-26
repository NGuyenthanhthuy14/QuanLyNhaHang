import authApiRequest from "@/apiRequests/auth";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    return Response.json(
      { error: "Bạn không có Refresh Token và Access Token" },
      { status: 401 }
    );
  }

  try {
    const result = await authApiRequest.sLogout({
      accessToken,
      refreshToken
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return Response.json(result.payload);
  } catch (error) {
    return Response.json(
      { error: "Lỗi khi gọi API backend" },
      { status: 500 }
    );
  }

	
}