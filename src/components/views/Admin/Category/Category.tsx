import DataTable from "@/components/ui/DataTable/DataTable";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constant";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";


const Category = () => {
    const {push, isReady, query} = useRouter();
    const {
        setURL, 
        currentPage, 
        currentLimit, 
        dataCategory, 
        isLoadingCategory, 
        isRefetchingCategory,
        refetchCategory,

        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    } = useCategory();

    const addCategoryModal = useDisclosure();

    useEffect(() => {
        if(isReady) {
            setURL();
        }
    }, [isReady])

const renderCell = useCallback(
  (category: Record<string, unknown>, columnKey: Key) => {
    const cellValue = category[columnKey as keyof typeof category];

    switch (columnKey) {
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <CiMenuKebab className="text-default-700" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key="detail-category-button"
                onPress={() => push(`/admin/category/${category._id}`)}
              >
                Detail Category
              </DropdownItem>
              <DropdownItem
                key="delete-category"
                className="text-danger"
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return cellValue as ReactNode;
    }
  },
  [push]
);

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LISTS_CATEGORY}
          currentPage={Number(currentPage)}
          data={dataCategory?.data || []}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          limit={String(currentLimit)} // Contoh: "10"
          currentLimit={Number(currentLimit) || 10}
          onChangePage={handleChangePage}
          onChangeLimit={handleChangeLimit}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={addCategoryModal.onOpen}
          renderCell={renderCell}   
         totalPages={dataCategory?.pagination.totalPages ?? 1}

        />
      )}
      <AddCategoryModal
        {...addCategoryModal}
        refetchCategory={refetchCategory}
      />
    </section>

  );
};

export default Category;
