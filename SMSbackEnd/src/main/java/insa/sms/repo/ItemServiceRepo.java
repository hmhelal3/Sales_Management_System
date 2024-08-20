package insa.sms.repo;

import insa.sms.model.Customer;
import insa.sms.model.ItemService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository("ItemServiceRepo")
public interface ItemServiceRepo extends JpaRepository<ItemService, Integer> {
    void deleteItemServiceById(Integer id);
//    void deleteItemServiceObject(ItemService itemService);

     Optional<ItemService> findItemServiceById(Integer id);
    ItemService findItemServiceDataById(Integer id);

    @Query("SELECT itemServiceName FROM ItemService where itemServiceName like %:keyword%")
    public List<String> search(@Param("keyword") String keyword);


    List<ItemService> findByItemServiceNameContainingIgnoreCase(String itemServiceName);

    ItemService findByItemServiceName(String itemServiceName);
    ItemService findByItemServiceCode(String code);
    @Query("SELECT COUNT(i) FROM ItemService i")
    Long getTotalNoItems();

    @Modifying
    @Query("UPDATE ItemService i SET i.quantity = i.quantity - :quantity WHERE i.code = :code")
    int updateItemQuantityByCode(@Param("code") String code, @Param("quantity") Integer quantity);
}
