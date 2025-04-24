##  Coding Standards

To ensure consistency and readability across the FitCheck project, the following coding conventions have been adopted by the team:

---

###  Python (Backend)
- **Style Guide**: [PEP8](https://peps.python.org/pep-0008/)
- **Indentation**: 4 spaces
- **Naming Conventions**:
  - Variable & function names: `snake_case`
  - Class names: `PascalCase`
  - Constants: `UPPER_CASE`
- **Docstrings**:
  - All functions, classes, and modules include triple-quoted docstrings.
- **Imports**:
  - Grouped and ordered: standard library, third-party packages, local modules.
- **Linters/Formatters**: `black`, `isort`, `flake8` (used locally or optionally with pre-commit hooks)

**Example:**
```python
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
```

---

###  JavaScript / React (Frontend)
- **Style Guide**: Based on [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- **Indentation**: 2 spaces
- **Naming Conventions**:
  - Variables & functions: `camelCase`
  - Components: `PascalCase`
- **JSX Formatting**:
  - Nested elements are properly indented
  - Use of controlled components for forms
- **Hooks**:
  - `useState`, `useEffect`, etc. used with clear naming and scoped appropriately
- **CSS Modules**:
  - Class names are `kebab-case` or `camelCase`, kept in a separate `.css` file per component

**Example:**
```jsx
const ManualClothingAdder = ({ onGoBack }) => {
  const [clothingType, setClothingType] = useState('');
  const [color, setColor] = useState('');
  ...
};
```

---

###  Common Practices
- No inline styles; CSS separated into files
- Reusable components for similar UI blocks (e.g., form fields)
- Error handling and loading states included in all API-related flows
- Token stored via `localStorage`, and included in Authorization headers for API requests

---

This standard has been followed consistently throughout the codebase across all contributors.