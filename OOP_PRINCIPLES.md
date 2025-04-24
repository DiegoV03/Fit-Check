##  Use of Object-Oriented Programming Principles in FitCheck

The FitCheck backend is designed with object-oriented design (OOD) principles in mind, which help us keep the architecture modular, extensible, and maintainable.

###  Encapsulation
- SQLAlchemy ORM models encapsulate the database schema and behavior for `User` and `ClothingItem`.
- Data access logic is abstracted inside `crud.py` functions, like `create_clothing_item`, `get_clothing_items`, etc.
- JWT authentication logic and hashing are wrapped in reusable `utils.py` methods such as `verify_password()` and `create_access_token()`.

```python
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
```

###  Abstraction
- Routes in `main.py` rely on high-level logic from `crud.py` and `utils.py`, hiding the implementation details from the API interface.
- Pydantic schemas (e.g. `UserCreate`, `ClothingItemResponse`) separate validation from business logic.

```python
class ClothingItemCreate(BaseModel):
    name: str
    category: str
    color: Optional[str] = None
```

###  Inheritance
- All database models inherit from the SQLAlchemy `Base` class.
- All Pydantic schemas extend `BaseModel`, gaining serialization and validation features.

```python
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
```

###  Polymorphism
- The outfit recommendation system accepts different categories (`top`, `bottom`, `shoe`) and generates combinations regardless of type.
- The front-end (React) dynamically renders multiple types of clothing using shared logic in components like `ManualClothingAdder.js`.

```js
{["Shirt", "Accessory", "Pants", "Outerwear", "Other"].map(type => (
    <label key={type}>
        <input ... value={type} checked={clothingType === type} />
        {type}
    </label>
))}
```

---

This OOP approach improves testability and encourages code reuse across features like user registration, outfit generation, and clothing management.