import TableAdmin from "@/components/admin/table";
import NavAdmin from "@/components/admin/navAdmin";
import useFetch from "@/hooks/useFetch";
import { adminUsersReponse } from "@/models/adminUserResponse";
import { PaginatedResponse } from "@/models/jsonResponse";
import UtilityTable from "@/components/admin/utilityTable";
import { useState } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const tableData = (datas: adminUsersReponse[] | undefined) => {
  if (!datas) {
    return undefined;
  }
  return datas.map((user) => {
    return {
      id: user.id,
      "User ID": "user_" + user.id,
      Name: user.name,
      Email: user.email,
      Role: user.role,
    };
  });
};

export default function ManageUserPage() {
  const [url, setUrl] = useState("/admin/users");

  useDocumentTitle("Pharmacy | Admin Manage User");

  const { data, isLoading } =
    useFetch<PaginatedResponse<adminUsersReponse>>(url);

  const handleUrlChange = (urlResult: string) => {
    setUrl(urlResult);
  };

  return (
    <>
      <NavAdmin />
      <div className="mt-4 p-8">
        <UtilityTable
          searchPlaceHolder="Search by Email"
          onAdd={() => {}}
          searchBy={[]}
          onSearch={handleUrlChange}
        />
        <TableAdmin
          isLoading={isLoading}
          data={tableData(data?.data.entries)}
          detailAction={false}
          url={url}
          pageInfo={data?.data.page_info}
          onClickPagination={handleUrlChange}
          headerColsNum={4}
        ></TableAdmin>
      </div>
    </>
  );
}
