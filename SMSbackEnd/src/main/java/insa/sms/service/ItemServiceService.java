package insa.sms.service;

import insa.sms.exception.UserNotFoundException;
import insa.sms.model.Customer;
import insa.sms.repo.ItemServiceRepo;
import insa.sms.model.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ItemServiceService {
    private final ItemServiceRepo itemServiceRepo;

    @Autowired
    public ItemServiceService(ItemServiceRepo itemServiceRepo) {
        this.itemServiceRepo = itemServiceRepo;
    }

    public ItemService addItemService(ItemService itemService) {

        return itemServiceRepo.save(itemService);
    }

    public List<ItemService> findAllItemService() {

        return itemServiceRepo.findAll();
    }

    public ItemService updateItemService(ItemService itemService) {

        return itemServiceRepo.save(itemService);
    }

    public ItemService findItemServiceById(Integer id) {
        return itemServiceRepo.findItemServiceById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public void deleteItemService(Integer id){
        itemServiceRepo.deleteItemServiceById(id);
    }
//
//    public void deleteItemServiceObject(ItemService itemService){
//        itemServiceRepo.deleteItemServiceObject(itemService);
//    }


    public List<String> search(String keyword) {
        return itemServiceRepo.search(keyword);
    }


    public List<ItemService> findByName(String itemServiceName) {
        return itemServiceRepo.findByItemServiceNameContainingIgnoreCase(itemServiceName);
    }

    public ItemService findByItemServiceName(String itemServiceName) {
        return itemServiceRepo.findByItemServiceName(itemServiceName);
    }
    public ItemService findByCode(String code) {
        return itemServiceRepo.findByItemServiceCode(code);
    }

    public Long getTotalNoItems() {
        return itemServiceRepo.getTotalNoItems();
    }
}
