"use client"
import { useState, useEffect } from "react"
import { useUser } from "@/context/userContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"
import type { Listing } from "@/types"
import LoadingSymbol from "@/components/Loading"

export default function AddListing() {
    const { user } = useUser()
    const [components, setComponents] = useState<{ component_name: string }[]>([])
    const [userListings, setUserListings] = useState<Listing[]>([])
    const [types, setTypes] = useState<{ type: string }[]>([])
    const [selectedComponent, setSelectedComponent] = useState<string>("")
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [url, setUrl] = useState<string>("")
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const getComponents = async () => {
        try {
            const response = await fetch("/api/vendor/components", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) throw new Error(`Error: ${response.status}`)

            const data = await response.json()
            setComponents(data)
        } catch (error) {
            console.error("Failed to fetch components:", error)
        }
    }

    const getUserListings = async () => {
        try {
            const response = await fetch("/api/vendor/user-listings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) throw new Error(`Error: ${response.status}`)

            const data = await response.json()
            setUserListings(data)
        } catch (error) {
            console.error("Failed to fetch user listings:", error)
        }
    }

    const getComponentTypes = async () => {
        try {
            const response = await fetch(`/api/vendor/component-types?component_name=${selectedComponent}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) throw new Error(`Error: ${response.status}`)

            const data = await response.json()
            setTypes(data)
        } catch (error) {
            console.error("Failed to fetch components:", error)
        }
    }

    const handleEditListing = (listing: Listing) => {
        const types: string[] = JSON.parse(String(listing.types))

        setSelectedListing(listing)
        setSelectedComponent(listing.component_name)
        setSelectedTypes(types.map((current, index) => (
            `${current}`
        )))
        setUrl(listing.url)
    }

    const resetForm = () => {
        setSelectedListing(null)
        setSelectedComponent("")
        setSelectedTypes([])
        setUrl("")
    }

    const handleSubmit = async () => {
        const listingData: Listing = {
            component_name: selectedComponent,
            types: selectedTypes,
            url: url,
        }

        const response = await fetch("/api/vendor/new-listing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listingData),
        })

        if (response.ok) {
            // Refresh the listings
            getUserListings()
            // Reset the form
            resetForm()
        }
    }

    useEffect(() => {
        getComponents()
        getUserListings()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [userListings])

    useEffect(() => {
        if (selectedComponent === "") return
        getComponentTypes()
    }, [selectedComponent])

    return (
        <div className="container max-w-2xl py-10">
            <Card>
                <CardContent className="grid grid-cols-[auto,1fr] p-0">
                    <div className="h-full p-6 border-r w-60 flex flex-col gap-2">
                        <CardTitle>{user?.displayName} Listings</CardTitle>

                        <div className="flex flex-col gap-2 h-full">
                            {loading
                                ? <LoadingSymbol />
                                : userListings.map((listing) => (
                                    <div
                                        key={listing.component_name}
                                        className={`p-2 rounded cursor-pointer hover:bg-muted ${selectedListing?.component_name === listing.component_name ? "bg-muted" : ""}`}
                                        onClick={() => handleEditListing(listing)}
                                    >
                                        {listing.component_name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 p-6">
                        <CardTitle>{selectedComponent ? selectedComponent : 'New Listing'}</CardTitle>

                        <div>
                            <Label>Store Name</Label>
                            <Input disabled={true} placeholder={user?.displayName} className="!cursor-default" />
                        </div>

                        <div>
                            <Label>Component</Label>
                            <Select
                                value={selectedComponent}
                                onValueChange={(value) => {
                                    setSelectedComponent(value)
                                    setSelectedTypes([])
                                    setUrl('')
                                }}
                            >
                                <SelectTrigger>
                                    {selectedComponent !== "" ? selectedComponent : 'Select Component'}
                                </SelectTrigger>

                                <SelectContent>
                                    {components.map((component) => (
                                        <SelectItem key={component.component_name} value={component.component_name}>
                                            {component.component_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {!!types.length && (
                            <div>
                                <Label>Listing Types</Label>
                                <Select
                                    value=""
                                    onValueChange={(value) => {
                                        console.log(value)
                                        selectedTypes.includes(value)
                                            ? setSelectedTypes((prev) => prev.filter((type) => type !== value))
                                            : setSelectedTypes((prev) => [...prev, value])
                                    }}
                                >
                                    <SelectTrigger>
                                        {!!selectedTypes.length ? selectedTypes.toString().replaceAll(",", ", ") : "Select Types"}
                                    </SelectTrigger>

                                    <SelectContent>
                                        {types.map((type) => (
                                            <SelectItem key={type.type} value={type.type}>
                                                <div className="flex gap-2">
                                                    <span>{type.type}</span>
                                                    {selectedTypes.includes(type.type) && <Check className="mt-[2px] w-4 h-4" />}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div>
                            <Label>Listing Url</Label>
                            <Input value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>

                        <div className="w-full justify-end flex pt-3">
                            <Button disabled={url === "" || selectedComponent === "" || !selectedTypes.length} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
