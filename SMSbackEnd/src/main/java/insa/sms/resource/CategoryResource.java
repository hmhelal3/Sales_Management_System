package insa.sms.resource;

import insa.sms.exception.UserNotFoundException;
import insa.sms.model.Category;
import insa.sms.repo.CategoryRepo;
import insa.sms.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/category")
public class CategoryResource {
    @Autowired
    private final CategoryRepo categoryRepo;
    private final CategoryService categoryService;


    public CategoryResource(CategoryRepo categoryRepo, CategoryService categoryService) {
        this.categoryRepo = categoryRepo;
        this.categoryService = categoryService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategorys () {
        List<Category> categorys = categoryService.findAllCategorys();
        return new ResponseEntity<>(categorys, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Category> getCategoryById (@PathVariable("id") Integer id) {
        Category category = categoryService.findCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category Category) {
        Category newCategory = categoryService.addCategory(Category);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Category> updateCategory(@RequestBody Category Category) {
        Category updateCategory = categoryService.updateCategory(Category);
        return new ResponseEntity<>(updateCategory, HttpStatus.OK);
    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deleteCategory(@PathVariable("id") Integer id) {
//        CategoryService.deleteCategory(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    /////Delete by id
    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Map<String, Boolean>> deleteCategoryDataById(@PathVariable Integer id) {
        Category category = categoryRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
        categoryRepo.delete(category);
        Map<String , Boolean> response = new HashMap<>();
        response.put("delete", Boolean.TRUE);
        return  ResponseEntity.ok(response);
    }
}
