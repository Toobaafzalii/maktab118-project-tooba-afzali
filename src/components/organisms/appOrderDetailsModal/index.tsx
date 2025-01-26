import AppModal from "@/components/molecules/appModal";
import AppTable from "@/components/molecules/appTable";
import useEditOrderById from "@/hooks/queries/useEditOrderById";
import useGetOrderById from "@/hooks/queries/useGetOrderById";
import { useEffect, useMemo, useState } from "react";

type AppOrderDetailsModalProps = {
  OrderId: string;
  userId?: string;
  onClose: () => void;
  onSuccess: () => void;
};

type Product = {
  product: {
    _id: string;
    price: number;
    name: string;
  };
  count: number;
  _id: string;
};

const OrderHeadCells = [
  { label: "کالا", key: "name", sortable: false },
  {
    label: "قیمت",
    key: "price",
    sortable: true,
  },
  { label: "تعداد", key: "count", sortable: true },
];

const AppOrderDetailsModal: React.FC<AppOrderDetailsModalProps> = ({
  OrderId,
  onClose,
  onSuccess,
}) => {
  const { getOrderById } = useGetOrderById({ id: OrderId });
  const { editOrderById } = useEditOrderById();
  const [products, setProducts] = useState<Array<Product>>([]);

  const handleChangeDeliveryStatusClick = () => {
    editOrderById(
      {
        id: OrderId,
        payLoad: { deliveryStatus: !getOrderById?.data?.order?.deliveryStatus },
      },
      {
        onSuccess: () => {
          console.log("changed");
          onSuccess();
          onClose();
        },
        onError: () => {
          console.log("failed");
        },
      }
    );
  };

  const changeButtonTitle = useMemo(() => {
    if (getOrderById?.data?.order?.deliveryStatus === true) {
      return "تغییر به در انتظار تحویل";
    }
    return "تغییر به تحویل شده";
  }, [getOrderById?.data?.order?.deliveryStatus]);

  const dateFormatter = (
    dateValue: string | Date | null | undefined | number
  ) => {
    if (!dateValue) return "تاریخ نامعتبر";
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "تاریخ نامعتبر";
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "full",
    }).format(date);
  };

  useEffect(() => {
    const fetchedProducts =
      getOrderById?.data?.order?.products?.map((item: any) => ({
        ...item.product,
        count: item.count,
      })) || [];
    console.log(getOrderById?.data?.order?.products);
    console.log(fetchedProducts);

    setProducts(fetchedProducts);
  }, [getOrderById]);

  return (
    <AppModal
      title="بررسی سفارش"
      modalButtons={[{ title: changeButtonTitle }, { title: "بستن" }]}
      onFirstButtonClick={handleChangeDeliveryStatusClick}
      onSecondButtonClick={onClose}
      onClose={onClose}
    >
      <div className="flex !flex-col justify-between items-start gap-6">
        <div className="flex w-full justify-start items-start gap-10">
          <div className="flex flex-col justify-between items-start gap-5">
            <div className="flex justify-start items-center gap-2 text-black">
              <span className="text-title-16 text-nowrap">نام مشتری:</span>
              <span className="text-subtitle-16">
                {getOrderById?.data?.order?.user?.firstname +
                  " " +
                  getOrderById?.data?.order?.user?.lastname}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2 text-black">
              <span className="text-title-16 text-nowrap">شماره تماس:</span>
              <span className="text-subtitle-16">
                {getOrderById?.data?.order?.user?.phoneNumber}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2 text-black">
              <span className="text-title-16 text-nowrap">
                مجموع مبلغ سفارش:
              </span>
              <span className="text-subtitle-16">
                {`${getOrderById?.data?.order.totalPrice} تومان`}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-5">
            <div className="flex justify-start items-center gap-2 text-black">
              <span className="text-title-16 text-nowrap">زمان سفارش:</span>
              <span className="text-subtitle-16">
                {dateFormatter(getOrderById?.data?.order?.createdAt)}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2 text-black">
              <span className="text-title-16 text-nowrap">
                زمان انتخابی تحویل:
              </span>
              <span className="text-subtitle-16">
                {dateFormatter(getOrderById?.data?.order?.deliveryDate)}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2 text-black">
              <span className="text-title-16 text-nowrap">وضعیت سفارش:</span>
              <span className="text-subtitle-16">
                {getOrderById?.data?.order?.deliveryStatus === true
                  ? "تحویل شده"
                  : "در انتظار تحویل"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-center gap-2 text-black">
          <span className="text-title-16 text-nowrap">آدرس:</span>
          <span className="text-subtitle-16 text-wrap line-clamp-3">
            {getOrderById?.data?.order?.user?.address}
          </span>
        </div>
        {getOrderById?.data && (
          <div className="!w-full flex flex-col justify-start items-start gap-5 !overflow-y-auto">
            <AppTable
              data={products}
              headCells={OrderHeadCells}
              title="جزییات سفارش"
            />
          </div>
        )}
      </div>
    </AppModal>
  );
};

export default AppOrderDetailsModal;
