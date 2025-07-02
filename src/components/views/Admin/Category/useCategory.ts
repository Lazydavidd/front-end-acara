import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constant";
import useDeBounce from "@/hooks/useDebounce";
import categoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router"
import { ChangeEvent } from "react";

const useCategory = () => {
    const router = useRouter();
    const debounce = useDeBounce();
    const currentLimit = Number(router.query.limit) || LIMIT_DEFAULT;
    const currentPage = Number(router.query.page) || PAGE_DEFAULT;
    const currentSearch = router.query.search;

    const setURL = () => {
        router.replace({
            query: {
                limit: currentLimit || LIMIT_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                search: currentSearch || "",
            }
        })
    }

const getCategories = async () => {
  let params = `limit=${currentLimit}&page=${currentPage}`;
  if (currentSearch) {
    params += `&search=${currentSearch}`;
  }

  const res = await categoryService.getCategories(params);
 const result = res.data;
 console.log(res.data);

  // Pastikan parsing ke number
  const total = Number(result.total ?? 0);
  const limit = Number(result.limit ?? LIMIT_DEFAULT);
  const page = Number(result.page ?? 1);

  const totalPages = Math.ceil(total / limit);

  console.log("total:", total, "limit:", limit, "totalPages:", totalPages);

  return {
    data: result.data || [],
    pagination: {
      total,
      totalPages,
      current: page,
    },
  };
};
    const {
        data: dataCategory,
        isLoading: isLoadingCategory,
        isRefetching: isRefetchingCategory,
        refetch: refetchCategory,
    } = useQuery ({
        queryKey: ["Category", currentPage, currentLimit, currentSearch],
        queryFn: () =>getCategories(),
        enabled: router.isReady,
    })

    const handleChangePage = (page: number) => {
        router.push ({
            query: {
                ...router.query,
                page,
            }
        })
    }

    const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedLimit = e.target.value;
        router.push({
            query: {
                ...router.query,
                limit: selectedLimit,
                page: PAGE_DEFAULT,
            }
        })
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => {
            const search = e.target.value;
            router.push({
                query: {
                    ...router.query,
                    search,
                    page: PAGE_DEFAULT,
                }
            })
        }, DELAY)
    }

        const handleClearSearch = () => {
            router.push({
                query: {
                    ...router.query,
                    search: "",
                    page: PAGE_DEFAULT,
                }
            })
        }

    return {
        setURL,
        currentPage,
        currentLimit,
        currentSearch,
        
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,

        refetchCategory,
    }
}

export default useCategory;