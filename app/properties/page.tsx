import { getAllProperties } from '@/actions/property';
import PropertyCard from '@/components/property-card'


const PropertyPage = async () => {
   const property = await getAllProperties();
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {property.length === 0 ? (<p>No properties found</p>) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {property.map(property => (
              <PropertyCard key={property.name}  property={property} />
            ))}
          </div>
        )}
      </div>

    </section>
  )
}

export default PropertyPage