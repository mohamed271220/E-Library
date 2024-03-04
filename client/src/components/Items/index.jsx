import Item from "../Item";
import ErrorBlock from "../ErrorBlock";

const Items = ({ items, type, user, error, isError }) => {

    if (isError) {
        return <ErrorBlock title='Something went wrong' message={error} />
    }

    // TODO: save item to account

    return (
        <section className=" md:py-[25px] py-[20px] lg:px-[100px] px-[2vh] flex flex-col gap-3 justify-center items-center">
            <div className="flex flex-wrap justify-center items-start  flex-row  gap-[2vh] ">
                {items?.map((item) => (
                    <Item
                        key={item._id}
                        item={item}
                        user={user}
                        type={type}
                    />
                ))}
            </div>
        </section>
    );
};

export default Items;
