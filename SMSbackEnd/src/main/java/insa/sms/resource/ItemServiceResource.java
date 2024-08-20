package insa.sms.resource;


import insa.sms.exception.UserNotFoundException;
import insa.sms.model.ItemService;
import insa.sms.repo.ItemServiceRepo;
import insa.sms.service.ItemServiceService;
//import insa.sms.model.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/item-service")
public class ItemServiceResource {

    @Autowired
    private final ItemServiceRepo itemServiceRepo;

    private final ItemServiceService itemServiceService;


    public ItemServiceResource(ItemServiceService itemServiceService, ItemServiceRepo itemServiceRepo) {
        this.itemServiceService = itemServiceService;
        this.itemServiceRepo = itemServiceRepo;

    }

//    @GetMapping("/all")
//    public List<ItemService> getAllItemServices () {
//
//        return itemServiceRepo.findAll();
//    }
    @GetMapping("/all")
    public ResponseEntity<List<ItemService>> getAllItemServices () {
        List<ItemService> itemServices = itemServiceService.findAllItemService();
        return new ResponseEntity<>(itemServices, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ItemService> getItemServiceById (@PathVariable("id") Integer id) {
        System.out.println("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
       System.out.println(id);
        ItemService itemService = itemServiceService.findItemServiceById(id);
        return new ResponseEntity<>(itemService, HttpStatus.OK);
    }

//    @PostMapping("/add")
//    public ResponseEntity<ItemService> addItemService(@RequestBody ItemService itemService) {
//        ItemService newItemService = itemServiceService.addItemService(itemService);
//        return new ResponseEntity<>(newItemService, HttpStatus.CREATED);
//    }
    @PostMapping("/add")
    public ItemService addItemService(@RequestBody ItemService itemService) {
        return itemServiceRepo.save(itemService);
    }



    @PutMapping("/update")
    public ResponseEntity<ItemService> updateItemService(@RequestBody ItemService itemService) {
        ItemService updateItemService = itemServiceService.updateItemService(itemService);
        return new ResponseEntity<>(updateItemService, HttpStatus.OK);
    }
/////Delete by id
    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Map<String, Boolean>> deleteItemService(@PathVariable Integer id) {
      ItemService itemService = itemServiceRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
        itemServiceRepo.delete(itemService);
        Map<String , Boolean> response = new HashMap<>();
        response.put("delete", Boolean.TRUE);
        return  ResponseEntity.ok(response);
    }
    /////Delete by id
//    @DeleteMapping("/delete/{id}")
//    public  ResponseEntity<?> deleteItemService1(@PathVariable Integer id) {
//        ItemService itemService1 = itemServiceRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
//        itemServiceRepo.delete(itemService1);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
    @RequestMapping(value = "search1", method = RequestMethod.GET)
    @ResponseBody
    public List<String> search(HttpServletRequest request) {
        return itemServiceService.search(request.getParameter("term"));
    }


    @GetMapping("/search")
    public List<ItemService> findByName(@RequestParam String itemServiceName) {
        return itemServiceService.findByName(itemServiceName);
    }
    @GetMapping("/findByName/{itemServiceName}")
    public ItemService getItemServiceNamee(@PathVariable String itemServiceName) {
        return itemServiceService.findByItemServiceName(itemServiceName);
    }

    @GetMapping("/findByCode/{code}")
    public ItemService getItemServiceDataByCode(@PathVariable String code) {
        return itemServiceService.findByCode(code);
    }

    @GetMapping("/count")
    public  Long getTotalNoItems() {
        return itemServiceService.getTotalNoItems();
    }

}
