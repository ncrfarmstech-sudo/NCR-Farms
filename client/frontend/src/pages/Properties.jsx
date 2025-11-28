import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { useProperties } from "../context/PropertiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const Properties = () => {
    const { properties, loading, error } = useProperties();
    const [filter, setFilter] = useState({
        propertyType: [],
        locationName: [],
        minPrice: "",
        maxPrice: "",
        size: [],
        search: "",
    });
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Extract unique values from properties
    const uniqueLocations = [
        ...new Set(properties.map((p) => p.locationName).filter(Boolean)),
    ].sort();
    const uniquePropertyTypes = [
        ...new Set(properties.map((p) => p.propertyType).filter(Boolean)),
    ].sort();
    const uniquePrices = properties
        .map((p) => p.price)
        .filter(Boolean)
        .sort((a, b) => a - b);
    const minAvailablePrice = uniquePrices.length > 0 ? uniquePrices[0] : 0;
    const maxAvailablePrice =
        uniquePrices.length > 0
            ? uniquePrices[uniquePrices.length - 1]
            : 10000000;

    // Sync URL search param with filter state
    useEffect(() => {
        const query = searchParams.get("search");
        if (query) {
            setFilter((prev) => ({ ...prev, search: query }));
        }
    }, [searchParams]);

    // Smart sentence search: extract keywords and match to all property parameters
    let filtered = properties;
    let fuseResults = [];
    const fuseOptions = {
        keys: [
            "title",
            "description",
            "price",
            "propertyType",
            "locationName",
            "address.street",
            "address.city",
            "address.state",
            "features.area",
        ],
        threshold: 0.2,
        ignoreLocation: true,
        minMatchCharLength: 2,
        findAllMatches: true,
    };
    if (properties.length === 0) {
        console.log("No properties loaded.");
    }
    console.log("Current Filter State:", filter);
    if (filter.search && filter.search.trim().length > 0) {
        // Stop words list
        const stopWords = [
            "i",
            "need",
            "want",
            "looking",
            "for",
            "in",
            "at",
            "the",
            "a",
            "an",
            "of",
            "with",
            "and",
            "or",
            "to",
            "my",
            "is",
            "are",
            "was",
            "were",
            "be",
            "been",
            "being",
            "have",
            "has",
            "had",
            "do",
            "does",
            "did",
            "but",
            "if",
            "so",
            "not",
            "no",
            "can",
            "will",
            "just",
            "only",
            "some",
            "any",
        ];

        // Split sentence into keywords, filter out stop words and empty strings
        const tokens = filter.search
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .filter((w) => w.length > 0 && !stopWords.includes(w));

        console.log("Original Search:", filter.search);
        console.log("Processed Tokens (Stop words removed):", tokens);

        if (tokens.length > 0) {
            // Create a query string for Fuse.js (OR logic by default for space-separated, but we can use extended search if needed)
            // For "industry standard" feel, we often want results that match ANY of the key terms, ranked by relevance.
            // Fuse.js search with a string does this well.

            const fuse = new Fuse(properties, {
                ...fuseOptions,
                threshold: 0.4, // Relaxed threshold for better fuzzy matching
                useExtendedSearch: true, // Enable extended search capabilities
            });

            // Construct a query where we look for items that match ANY of the tokens (OR logic)
            // Using ' | ' separator for Fuse.js extended search
            const query = tokens.join(" | ");

            const results = fuse.search(query);
            console.log(`Fuse Results for query "${query}":`, results.length);

            fuseResults = results.map((res) => res.item);
            console.log("Final Fuse Results:", fuseResults);
            filtered = fuseResults.length > 0 ? fuseResults : [];
        } else {
            // If all words were stop words, maybe fall back to original search or show nothing?
            // Let's try searching the original string just in case, or show all if it was just "i need"
            console.log(
                "All tokens were stop words. Searching original string."
            );
            const fuse = new Fuse(properties, fuseOptions);
            const results = fuse.search(filter.search);
            fuseResults = results.map((res) => res.item);
            filtered = fuseResults.length > 0 ? fuseResults : [];
        }
    }
    
    // Helper function to check if property size matches selected size filters
    const matchesSize = (propertyArea) => {
        if (filter.size.length === 0) return true;
        
        const areaNum = propertyArea || 0;
        
        return filter.size.some((sizeFilter) => {
            switch(sizeFilter) {
                case '1210 sqyd':
                    return areaNum >= 1210 && areaNum < 2420;
                case '2420 sqyd':
                    return areaNum >= 2420 && areaNum < 43560; // 1 acre
                case '1 acr':
                    return areaNum >= 43560 && areaNum < 87120; // 1-2 acres
                case 'More than 1 acr':
                    return areaNum >= 43560;
                default:
                    return false;
            }
        });
    };
    
    // Apply other filters after fuzzy search
    filtered = filtered.filter((p) => {
        const price = parseInt(p.price) || 0;
        const minPriceFilter = parseInt(filter.minPrice) || 0;
        const maxPriceFilter = parseInt(filter.maxPrice) || 1e9;
        const pArea = p.features && p.features.area ? p.features.area : 0;

        return (
            (filter.propertyType.length === 0 ||
                filter.propertyType.includes(p.propertyType)) &&
            (filter.locationName.length === 0 ||
                filter.locationName.includes(p.locationName)) &&
            (!filter.minPrice || price >= minPriceFilter) &&
            (!filter.maxPrice || price <= maxPriceFilter) &&
            matchesSize(pArea)
        );
    });

    // Helper to safely render only strings/numbers
    const safe = (val) => {
        if (val == null) return "";
        if (typeof val === "object") return "";
        return val;
    };

    return (
        <div className="pt-20 pb-12 bg-[#f3e9db] min-h-screen">
            <div className="px-2 md:px-10 mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
                    Available Properties
                </h1>
                {filter.search && (
                    <div className="text-center text-xs text-gray-500 mb-2">
                        Search: <b>{filter.search}</b> | Fuse.js matches:{" "}
                        <b>{fuseResults.length}</b>
                    </div>
                )}
                <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                    Browse our curated list of premium farmhouses and properties
                    available for rent and sale across Delhi NCR.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-0">
                {/* Sidebar Filters */}
                <aside
                    className="w-full md:w-72 p-6 h-fit sticky top-20 rounded-none md:rounded-r-xl"
                    style={{
                        backgroundColor: "#275A4D",
                        color: "white",
                    }}
                >
                    <h2 className="text-xl font-bold mb-4 text-white tracking-wide">
                        FILTER
                    </h2>

                    {/* Search 
                    <div className="mb-6 pb-4 border-b border-gray-500">
                        <h3 className="text-sm font-semibold mb-3 text-white">
                            SEARCH
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Search properties..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="flex-1 px-3 py-2 rounded text-black text-sm"
                            />
                            <button
                                className="bg-[#3BA9F5] text-black px-4 py-2 rounded hover:bg-[#2A94DC] transition font-medium text-sm"
                                onClick={() => {
                                    setFilter((prev) => ({
                                        ...prev,
                                        search: searchInput,
                                    }));
                                }}
                            >
                                Search
                            </button>
                        </div>
                    </div>*/}

                    {/* Location */}
                    <div className="mb-6 pb-4 border-b border-gray-500">
                        <h3 className="text-sm font-semibold mb-3 text-white">
                            LOCATION
                        </h3>

                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {uniqueLocations.length > 0 ? (
                                uniqueLocations.map((location) => (
                                    <label
                                        key={location}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filter.locationName.includes(
                                                location
                                            )}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setFilter({
                                                        ...filter,
                                                        locationName: [
                                                            ...filter.locationName,
                                                            location,
                                                        ],
                                                    });
                                                } else {
                                                    setFilter({
                                                        ...filter,
                                                        locationName:
                                                            filter.locationName.filter(
                                                                (l) =>
                                                                    l !==
                                                                    location
                                                            ),
                                                    });
                                                }
                                            }}
                                            className="w-4 h-4 rounded bg-white"
                                        />
                                        <span className="text-gray-200 text-sm">
                                            {location}
                                        </span>
                                    </label>
                                ))
                            ) : (
                                <p className="text-sm text-gray-300">
                                    No locations available
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="mb-6 pb-4 border-b border-gray-500">
                        <h3 className="text-sm font-semibold mb-3 text-white">
                            PROPERTY TYPE
                        </h3>
                        <div className="space-y-2">
                            {uniquePropertyTypes.map((type) => (
                                <label
                                    key={type}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filter.propertyType.includes(
                                            type
                                        )}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFilter({
                                                    ...filter,
                                                    propertyType: [
                                                        ...filter.propertyType,
                                                        type,
                                                    ],
                                                });
                                            } else {
                                                setFilter({
                                                    ...filter,
                                                    propertyType:
                                                        filter.propertyType.filter(
                                                            (t) => t !== type
                                                        ),
                                                });
                                            }
                                        }}
                                        className="w-4 h-4 rounded bg-white"
                                    />
                                    <span className="text-gray-200 text-sm">
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6 pb-4 border-b border-gray-500">
                        <h3 className="text-sm font-semibold mb-3 text-white">
                            PRICE RANGE
                        </h3>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-200 block mb-2">
                                ₹{filter.minPrice || minAvailablePrice} - ₹{filter.maxPrice || maxAvailablePrice}
                            </label>
                            <input
                                type="range"
                                min={minAvailablePrice}
                                max={maxAvailablePrice}
                                value={filter.minPrice || minAvailablePrice}
                                onChange={(e) => {
                                    const newMin = parseInt(e.target.value);
                                    const currentMax = parseInt(filter.maxPrice) || maxAvailablePrice;
                                    if (newMin <= currentMax) {
                                        setFilter({
                                            ...filter,
                                            minPrice: e.target.value,
                                        });
                                    }
                                }}
                                className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
                            />
                           
                        </div>
                    </div>

                    {/* Size Filter */}
                    <div className="mb-6 pb-4 border-b border-gray-500">
                        <h3 className="text-sm font-semibold mb-3 text-white">
                            SIZE
                        </h3>
                        <div className="space-y-2">
                            {['1210 sqyd', '2420 sqyd', '1 acr', 'More than 1 acr'].map((size) => (
                                <label
                                    key={size}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filter.size.includes(size)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFilter({
                                                    ...filter,
                                                    size: [...filter.size, size],
                                                });
                                            } else {
                                                setFilter({
                                                    ...filter,
                                                    size: filter.size.filter(
                                                        (s) => s !== size
                                                    ),
                                                });
                                            }
                                        }}
                                        className="w-4 h-4 rounded bg-white"
                                    />
                                    <span className="text-gray-200 text-sm">
                                        {size}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Reset */}
                    <button
                        className="w-full bg-[#3BA9F5] text-black py-2 rounded-md hover:bg-[#2A94DC] transition font-medium text-sm"
                        onClick={() => {
                            setFilter({
                                propertyType: [],
                                locationName: [],
                                minPrice: "",
                                maxPrice: "",
                                size: [],
                                search: "",
                            });
                        }}
                    >
                        Reset Filters
                    </button>
                </aside>

                {/* Property Listing */}
                <main className="flex-1 px-2 md:px-10">
                    {loading ? (
                        <div className="text-center text-lg text-gray-500 py-20">
                            Loading properties...
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-20">
                            {error}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No properties found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your search or filters to find
                                what you're looking for.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {filtered.map((p, idx) => {
                                const showDetails = p._showDetails || false;
                                return (
                                    <div
                                        key={p._id || p.id}
                                        className={
                                            `bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col animate-fade-in` +
                                            (showDetails
                                                ? " ring-2 ring-green-400"
                                                : "")
                                        }
                                        style={{
                                            animationDelay: `${idx * 80}ms`,
                                        }}
                                    >
                                        {/* Image */}
                                        <div className="relative">
                                            <img
                                                src={
                                                    Array.isArray(p.images) &&
                                                    p.images.length > 0
                                                        ? p.images[0]
                                                        : safe(p.imageUrl) ||
                                                          safe(p.img) ||
                                                          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                                                }
                                                alt={
                                                    safe(p.title) || "Property"
                                                }
                                                className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                            {safe(p.rating) && (
                                                <span className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md shadow text-sm font-semibold flex items-center">
                                                    ⭐ {safe(p.rating)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="text-lg font-semibold text-green-900 transition-colors duration-300">
                                                {safe(p.title) || "Farmhouse"}
                                            </h3>
                                            <p className="text-gray-500 text-sm mb-3">
                                                {safe(
                                                    p.address && p.address.city
                                                ) || ""}
                                                ,{" "}
                                                {safe(
                                                    p.address && p.address.state
                                                ) || ""}
                                            </p>

                                            <div className="flex items-center gap-4 text-gray-600 text-sm mb-2">
                                                <span>
                                                    🛏{" "}
                                                    {p.features &&
                                                    p.features.bedrooms
                                                        ? p.features.bedrooms
                                                        : 0}{" "}
                                                    Beds
                                                </span>
                                                <span>
                                                    🛁{" "}
                                                    {p.features &&
                                                    p.features.bathrooms
                                                        ? p.features.bathrooms
                                                        : 0}{" "}
                                                    Baths
                                                </span>
                                                <span>
                                                    📐{" "}
                                                    {p.features &&
                                                    p.features.area
                                                        ? p.features.area
                                                        : 0}{" "}
                                                    sqft
                                                </span>
                                            </div>
                                            <div className="text-gray-600 text-sm mb-4">
                                                {p.features &&
                                                p.features.furnished
                                                    ? "🛋️ Furnished"
                                                    : "Unfurnished"}
                                            </div>

                                            <div className="flex justify-between items-center mt-auto">
                                                <p className="text-green-900 font-bold">
                                                    Rs. {safe(p.price) || "N/A"}
                                                    <span className="text-gray-500 text-sm">
                                                        {" "}
                                                        /night
                                                    </span>
                                                </p>
                                                <button
                                                    className={
                                                        "bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-800 transition " +
                                                        (showDetails
                                                            ? "scale-95"
                                                            : "")
                                                    }
                                                    onClick={() => {
                                                        navigate(
                                                            `/properties/${
                                                                p._id || p.id
                                                            }`
                                                        );
                                                    }}
                                                >
                                                    View Details
                                                </button>
                                            </div>

                                            {/* Inline Details */}
                                            <div
                                                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                                    showDetails
                                                        ? "max-h-[500px] opacity-100"
                                                        : "max-h-0 opacity-0"
                                                }`}
                                            >
                                                {showDetails && (
                                                    <div className="mt-4 border-t pt-4 animate-slide-down">
                                                        <div className="text-gray-700 mb-2">
                                                            {safe(
                                                                p.description
                                                            ) ||
                                                                "No description available."}
                                                        </div>
                                                        <div className="flex gap-2 flex-wrap text-sm text-gray-600 mb-2">
                                                            <span>
                                                                Status:{" "}
                                                                {safe(
                                                                    p.status
                                                                ) || "N/A"}
                                                            </span>
                                                            <span>
                                                                Type:{" "}
                                                                {safe(
                                                                    p.propertyType
                                                                ) || "N/A"}
                                                            </span>
                                                            <span>
                                                                Address:{" "}
                                                                {safe(
                                                                    p.address &&
                                                                        p
                                                                            .address
                                                                            .street
                                                                ) || ""}{" "}
                                                                {safe(
                                                                    p.address &&
                                                                        p
                                                                            .address
                                                                            .city
                                                                ) || ""}{" "}
                                                                {safe(
                                                                    p.address &&
                                                                        p
                                                                            .address
                                                                            .state
                                                                ) || ""}{" "}
                                                                {safe(
                                                                    p.address &&
                                                                        p
                                                                            .address
                                                                            .pincode
                                                                ) || ""}
                                                            </span>
                                                        </div>
                                                        {Array.isArray(
                                                            p.images
                                                        ) &&
                                                            p.images.length >
                                                                0 && (
                                                                <div className="flex gap-2 flex-wrap mt-2">
                                                                    {p.images.map(
                                                                        (
                                                                            img,
                                                                            i
                                                                        ) => (
                                                                            <img
                                                                                key={
                                                                                    i
                                                                                }
                                                                                src={
                                                                                    img
                                                                                }
                                                                                alt="Property"
                                                                                className="w-16 h-16 object-cover rounded"
                                                                            />
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        /* Add to your global CSS (e.g., index.css or App.css) if not already present: */
                        /*
            .animate-fade-in {
              animation: fadeIn 0.7s both;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: none; }
            }
            .animate-slide-down {
              animation: slideDown 0.5s cubic-bezier(.4,0,.2,1) both;
            }
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: none; }
            }
            */
                    )}
                </main>
            </div>
        </div>
    );
};

export default Properties;
