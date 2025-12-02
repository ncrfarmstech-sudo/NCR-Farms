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
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
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
            {/* Header */}
            <div className="px-4 md:px-10 mb-6 md:mb-10">
                <h1 className="text-2xl md:text-4xl font-bold text-center mb-2 text-gray-800">
                    Available Properties
                </h1>
                <p className="text-gray-600 text-center text-sm md:text-base max-w-2xl mx-auto">
                    Browse our curated list of premium farmhouses and properties
                </p>
            </div>

            {/* Mobile Filter Button */}
            <div className="md:hidden px-4 mb-4">
                <button
                    onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                    className="w-full bg-[#275A4D] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                    <span>🔍 Filters</span>
                    <span className="text-lg">{mobileFilterOpen ? "−" : "+"}</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-0 px-4 md:px-0">
                {/* Mobile Collapsible Filters */}
                {mobileFilterOpen && (
                    <div className="md:hidden fixed inset-0 top-20 bg-black/50 z-40" onClick={() => setMobileFilterOpen(false)}></div>
                )}
                
                <aside
                    className={`fixed md:static inset-0 top-20 w-full md:w-72 bg-[#275A4D] text-white z-50 md:z-0 md:sticky md:h-fit rounded-none
                        transform transition-transform duration-300 md:transform-none md:rounded-none md:rounded-r-xl
                        ${mobileFilterOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                        overflow-y-auto md:overflow-y-visible p-4 md:p-6`}
                >
                    <div className="flex justify-between items-center md:hidden mb-4">
                        <h2 className="text-lg font-bold">FILTER</h2>
                        <button
                            onClick={() => setMobileFilterOpen(false)}
                            className="text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                    <h2 className="hidden md:block text-lg md:text-xl font-bold mb-4 text-white tracking-wide">
                        FILTER
                    </h2>

                    {/* Location */}
                    <div className="mb-5 pb-4 border-b border-gray-500">
                        <h3 className="text-sm font-semibold mb-3 text-white">LOCATION</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {uniqueLocations.length > 0 ? (
                                uniqueLocations.map((location) => (
                                    <label key={location} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={filter.locationName.includes(location)}
                                            onChange={(e) => {
                                                setFilter({
                                                    ...filter,
                                                    locationName: e.target.checked
                                                        ? [...filter.locationName, location]
                                                        : filter.locationName.filter((l) => l !== location),
                                                });
                                                // Auto-close on mobile after selection
                                                setTimeout(() => setMobileFilterOpen(false), 300);
                                            }}
                                            className="w-4 h-4 rounded accent-[#FFCA17]"
                                        />
                                        <span className="text-gray-200 text-sm">{location}</span>
                                    </label>
                                ))
                            ) : (
                                <p className="text-sm text-gray-300">No locations available</p>
                            )}
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="mb-5 pb-4 border-b border-gray-500">
                        <h3 className="text-sm font-semibold mb-3 text-white">PROPERTY TYPE</h3>
                        <div className="space-y-2">
                            {uniquePropertyTypes.map((type) => (
                                <label key={type} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filter.propertyType.includes(type)}
                                        onChange={(e) => {
                                            setFilter({
                                                ...filter,
                                                propertyType: e.target.checked
                                                    ? [...filter.propertyType, type]
                                                    : filter.propertyType.filter((t) => t !== type),
                                            });
                                            // Auto-close on mobile after selection
                                            setTimeout(() => setMobileFilterOpen(false), 300);
                                        }}
                                        className="w-4 h-4 rounded accent-[#FFCA17]"
                                    />
                                    <span className="text-gray-200 text-sm">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-5 pb-4 border-b border-gray-500">
                        <h3 className="text-sm font-semibold mb-3 text-white">PRICE RANGE</h3>
                        <label className="text-xs text-gray-200 block mb-3">
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
                                    setFilter({ ...filter, minPrice: e.target.value });
                                }
                            }}
                            className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer accent-[#FFCA17]"
                        />
                    </div>

                    {/* Size Filter */}
                    <div className="mb-5 pb-4 border-b border-gray-500">
                        <h3 className="text-sm font-semibold mb-3 text-white">SIZE</h3>
                        <div className="space-y-2">
                            {['1210 sqyd', '2420 sqyd', '1 acr', 'More than 1 acr'].map((size) => (
                                <label key={size} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filter.size.includes(size)}
                                        onChange={(e) => {
                                            setFilter({
                                                ...filter,
                                                size: e.target.checked
                                                    ? [...filter.size, size]
                                                    : filter.size.filter((s) => s !== size),
                                            });
                                            // Auto-close on mobile after selection
                                            setTimeout(() => setMobileFilterOpen(false), 300);
                                        }}
                                        className="w-4 h-4 rounded accent-[#FFCA17]"
                                    />
                                    <span className="text-gray-200 text-sm">{size}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button
                        className="w-full bg-[#FFCA17] text-black py-2 rounded-md  transition font-medium text-sm"
                        onClick={() => {
                            setFilter({
                                propertyType: [],
                                locationName: [],
                                minPrice: "",
                                maxPrice: "",
                                size: [],
                                search: "",
                            });
                            setMobileFilterOpen(false);
                        }}
                    >
                        Reset Filters
                    </button>
                </aside>

                {/* Property Listing */}
                <main className="flex-1 w-full md:w-auto">
                    {loading ? (
                        <div className="text-center text-gray-500 py-20">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-20">{error}</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties found</h3>
                            <p className="text-gray-500 text-sm">Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:px-10">
                            {filtered.map((p) => (
                                <div
                                    key={p._id || p.id}
                                    className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col cursor-pointer"
                                    onClick={() => navigate(`/properties/${p._id || p.id}`)}
                                >
                                    {/* Image */}
                                    <div className="relative">
                                        <img
                                            src={
                                                Array.isArray(p.images) && p.images.length > 0
                                                    ? p.images[0]
                                                    : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                                            }
                                            alt={p.title || "Property"}
                                            className="w-full h-40 md:h-56 object-cover"
                                        />
                                        {p.rating && (
                                            <span className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs md:text-sm font-semibold">
                                                ⭐ {p.rating}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 md:p-5 flex flex-col flex-grow">
                                        <h3 className="text-base md:text-lg font-semibold text-green-900 mb-1 line-clamp-2">
                                            {p.title || "Farmhouse"}
                                        </h3>
                                        <p className="text-gray-500 text-xs md:text-sm mb-3">
                                            {p.address?.city}, {p.address?.state}
                                        </p>

                                        {/* Features Grid */}
                                        <div className="grid grid-cols-3 gap-2 text-gray-600 text-xs md:text-sm mb-3">
                                            <div className="text-center py-2 bg-gray-50 rounded">
                                                <div>🏠</div>
                                                <div className="font-semibold text-sm">{p.propertyType || "N/A"}</div>
                                            </div>
                                            
                                            <div className="text-center py-2 bg-gray-50 rounded">
                                                <div>📐</div>
                                                <div className="font-semibold text-xs">{p.features?.area || 0}</div>
                                            </div>
                                        </div>

                                        {/* Price and Button */}
                                        <div className="flex justify-between items-end mt-auto">
                                            <div>
                                                <p className="text-green-900 font-bold text-base md:text-lg">
                                                    ₹{p.price || "N/A"}
                                                </p>
                                                <p className="text-gray-500 text-xs">/night</p>
                                            </div>
                                            <button
                                                className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-xs md:text-sm font-medium"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/properties/${p._id || p.id}`);
                                                }}
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Properties;
