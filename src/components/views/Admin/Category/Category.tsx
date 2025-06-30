import DataTable from "@/components/ui/DataTable/DataTable";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constant";

const Category = () => {
    const {push} = useRouter();
    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
                const cellValue = category[columnKey as keyof typeof category];

                switch(columnKey) {
                    case 'icon':
                        return(
                            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
                        );
                        case "action":
                            return(
                                <Dropdown>
                                     <DropdownTrigger>
                                        <Button 
                                        isIconOnly size="sm" variant="light">
                                            <CiMenuKebab className="text-default-700"/>
                                        </Button>
                                     </DropdownTrigger>
                                     <DropdownMenu>
                                        <DropdownItem
                                        key="detail-category-button"
                                        onPress={() => push(`/admin/category/${category._id}`)}>Detail Category
                                        </DropdownItem>
                                     </DropdownMenu>
                                      <DropdownItem
                                        key="delete-category"
                                        className="text-danger-500">Delete
                                        </DropdownItem>
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
            <DataTable 
            buttonTopContentLabel="Create Category"
            columns={COLUMN_LISTS_CATEGORY} 
            data={[
                { 
                _id: 123, 
                name: "Category 1", 
                description: "description 1",
                icon: "/images/general/logo.png",
                }
            ]}
            emptyContent="No categories found"
            onSearch={() => {}}
            onClearSearch={() => {}}
            onClickButtonTopContent={() => {}}
            renderCell={renderCell} 
            currentPage={1}
            currentLimit={10}
            totalPages={2}
            onChangePage={() => {}}
            onChangeLimit={() => {}}
            />

        </section>
        );
};

export default Category;