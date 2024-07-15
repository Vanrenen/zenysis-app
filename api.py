from enum import Enum
from typing import List
from itertools import cycle

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow all cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CalculationType(str, Enum):
    min = "min"
    max = "max"
    sum = "sum"

class Indicator(BaseModel):
    code: str
    name: str
    short_name: str
    description: str
    calculation: CalculationType
    category: str

class Dimension(BaseModel):
    code: str
    name: str
    description: str
    category: str

class Category(BaseModel):
    code: str
    name: str

# Mock initial data
seed_indicators = (
    Indicator(code="IND", name="Population", short_name="Pop", description="Total population", calculation=CalculationType.sum, category="Demographic"),
    Indicator(code="IND", name="GDP", short_name="GDP", description="Gross Domestic Product", calculation=CalculationType.sum, category="Economic"),
)
indicators = {
    f'{seed.code}{idx}': seed.copy(update={'code': f'{seed.code}{idx}', 'name': f'{seed.name} {idx}'})
	for idx, seed in zip(range(100), cycle(seed_indicators))
}

seed_dimensions = (
    Dimension(code="DIM", name="Country", description="The country of the data", category="Geography"),
    Dimension(code="DIM", name="Year", description="The year of the data", category="Time"),
)
dimensions = {
    f'{seed.code}{idx}': seed.copy(update={'code': f'{seed.code}{idx}', 'name': f'{seed.name} {idx}'})
	for idx, seed in zip(range(100), cycle(seed_dimensions))
}

# Category data
indicator_categories = {
    "Demographic": Category(code="Demographic", name="Demographic"),
    "Economic": Category(code="Economic", name="Economic"),
}

dimension_categories = {
    "Geography": Category(code="Geography", name="Geography"),
    "Time": Category(code="Time", name="Time"),
}

# Indicator Categories CRUD
@app.get("/indicator_categories/")
def read_indicator_categories():
    return list(indicator_categories.values())

@app.post("/indicator_categories/", status_code=201)
def create_indicator_category(category: Category):
    if category.code in indicator_categories:
        raise HTTPException(status_code=400, detail="Category already exists")
    indicator_categories[category.code] = category
    return category

@app.put("/indicator_categories/{code}")
def update_indicator_category(code: str, category: Category):
    if code not in indicator_categories:
        raise HTTPException(status_code=404, detail="Category not found")
    indicator_categories[code] = category
    return category

@app.delete("/indicator_categories/{code}", status_code=204)
def delete_indicator_category(code: str):
    if code in indicator_categories:
        del indicator_categories[code]
        return
    raise HTTPException(status_code=404, detail="Category not found")

# Dimension Categories CRUD
@app.get("/dimension_categories/")
def read_dimension_categories():
    return list(dimension_categories.values())

@app.post("/dimension_categories/", status_code=201)
def create_dimension_category(category: Category):
    if category.code in dimension_categories:
        raise HTTPException(status_code=400, detail="Category already exists")
    dimension_categories[category.code] = category
    return category

@app.put("/dimension_categories/{code}")
def update_dimension_category(code: str, category: Category):
    if code not in dimension_categories:
        raise HTTPException(status_code=404, detail="Category not found")
    dimension_categories[code] = category
    return category

@app.delete("/dimension_categories/{code}", status_code=204)
def delete_dimension_category(code: str):
    if code in dimension_categories:
        del dimension_categories[code]
        return
    raise HTTPException(status_code=404, detail="Category not found")

@app.post("/indicators/", status_code=201)
def create_indicator(indicator: Indicator):
    if indicator.code in indicators:
        raise HTTPException(status_code=400, detail="Indicator with this code already exists")
    if indicator.category not in indicator_categories:
        raise HTTPException(status_code=400, detail="Indicator category does not exist")
    indicators[indicator.code] = indicator
    return indicator

@app.put("/indicators/{code}")
def update_indicator(code: str, updated_indicator: Indicator):
    if code not in indicators:
        raise HTTPException(status_code=404, detail="Indicator not found")
    if updated_indicator.category not in indicator_categories:
        raise HTTPException(status_code=400, detail="Indicator category does not exist")
    indicators[code] = updated_indicator
    return updated_indicator

@app.post("/dimensions/", status_code=201)
def create_dimension(dimension: Dimension):
    if dimension.code in dimensions:
        raise HTTPException(status_code=400, detail="Dimension with this code already exists")
    if dimension.category not in dimension_categories:
        raise HTTPException(status_code=400, detail="Dimension category does not exist")
    dimensions[dimension.code] = dimension
    return dimension

@app.put("/dimensions/{code}")
def update_dimension(code: str, updated_dimension: Dimension):
    if code not in dimensions:
        raise HTTPException(status_code=404, detail="Dimension not found")
    if updated_dimension.category not in dimension_categories:
        raise HTTPException(status_code=400, detail="Dimension category does not exist")
    dimensions[code] = updated_dimension
    return updated_dimension

@app.get("/indicators/{code}")
def read_indicator(code: str):
    if code in indicators:
        return indicators[code]
    raise HTTPException(status_code=404, detail="Indicator not found")

@app.delete("/indicators/{code}", status_code=204)
def delete_indicator(code: str):
    if code in indicators:
        del indicators[code]
        return
    raise HTTPException(status_code=404, detail="Indicator not found")

@app.get("/dimensions/{code}")
def read_dimension(code: str):
    if code in dimensions:
        return dimensions[code]
    raise HTTPException(status_code=404, detail="Dimension not found")

@app.delete("/dimensions/{code}", status_code=204)
def delete_dimension(code: str):
    if code in dimensions:
        del dimensions[code]
        return
    raise HTTPException(status_code=404, detail="Dimension not found")

# Endpoint with pagination for indicators
@app.get("/indicators/", response_model=List[Indicator])
def read_indicators(skip: int = 0, limit: int = 10):
    return list(indicators.values())[skip: skip + limit]

# Endpoint with pagination for dimensions
@app.get("/dimensions/", response_model=List[Dimension])
def read_dimensions(skip: int = 0, limit: int = 10):
    return list(dimensions.values())[skip: skip + limit]
