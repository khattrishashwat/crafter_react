import React,{useState} from 'react';
import { Link } from 'react-router-dom';


function Import() {

  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        console.log('Image Data:', imageData);
        setImagePreview(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageReset = () => {
    setImagePreview('');
    document.getElementById('imageInput').value = null;
  };
  return (
    <div>
      <div className="big-containe">
  <div className="small-container">
    <div className="Institution-main-parent">
      <div className="Institution-grid-1 bg">
        <Link to="/genral" className="company">
          <div className="unser-heads">
            <h5>Company Details</h5>
            <i className="fa-solid fa-chevron-right" />
          </div>
        </Link>
        <Link to="/fgenral" className="company">
          <div className="unser-heads">
            <h5>Functions</h5>
            <i className="fa-solid fa-chevron-right" />
          </div>
        </Link>
        <Link to="/activeuser" className="company">
          <div className="unser-heads">
            <h5>User Accounts</h5>
            <i className="fa-solid fa-chevron-right" />
          </div>
        </Link>
        <Link to="/master" className="company">
          <div className="unser-heads">
            <h5>Master Data</h5>
            <i className="fa-solid fa-chevron-right" />
          </div>
        </Link>
        <Link to="/additional" className="company">
          <div className="unser-heads">
            <h5>Additional Modules</h5>
            <i className="fa-solid fa-chevron-right" />
          </div>
        </Link>
        <Link to="/import" className="company details">
          <div className="unser-heads">
            <h5 className="main-clr">Import Data</h5>
            <i className="fa-solid fa-chevron-right main-clr" />
          </div>
        </Link>
      </div>
      <div className="Institution-grid-2 bg">
  <div className="compan">
    <h4 className="mt-41">Import data</h4>
    <p>
      In this menu you can import your own existing data (such as customers,
      addresses, contacts, articles and objects) into your environment. Drag or
      select an Excel file containing the data to be imported into the field
      below. You will then see a table where you can choose per column into
      which field the data should be imported. If you click below on what you
      want to import, you will see an additional explanation.
    </p>
    <h5 className="general-head">
      General explanation of customers and locations
    </h5>
    <p className="text">
      Before you start importing, it is very important to consider how you want
      the data to end up in Crafter. The customers (clients) and locations can
      refer to each other in different ways. This has to do with how the package
      is structured and can work best for you:
      <br />
      Do you work with clients where the work location (this is the address
      where the professional will work) is the same? In that case, you can link
      the address columns to the address fields under the heading 'client'. The
      address is then directly linked to the client's company. The same applies
      to the contact persons.
      <br />
      If you work with clients who have multiple work locations (for example a
      housing association), things work differently. In that case, you first
      only import the clients with the principal address of the client (the main
      address is then their visiting address or billing address). After you have
      done that import, you do a second import in which you import the work
      locations separately, using the fields under the heading 'work location'.
      <br />
      Make sure that you import a unique customer number per client during the
      first import. This allows you to link the work locations to the customer
      using the 'customer number (linked customer)' field. They are not listed
      as the main location for that customer, but you can find them when you
      create a work order for this customer.
    </p>
    <input type="checkbox" className="text-btn" />
    <h5 className="general-head mt-3">Customers (clients)</h5>
    <p className="text">
      When importing customers (clients), only the 'company name' field is
      required. Using the 'type of company' field you can indicate whether it is
      a business or private customer. In this case, you only need to indicate
      the word 'business' or 'private' in the rules. If you want to link
      additional data to the customer later (for example during a subsequent
      import), it is important to also import a customer number. You must then
      use an identical number for each customer, to which data (such as
      locations or contact persons) can later be linked.
    </p>
    <input type="checkbox" className="text-btn" />
    <h5 className="general-head mt-3">Work locations (addresses)</h5>
    <p className="text">
      When importing locations, it is important to consider what the location in
      question is. If the location is a billing address or main address for the
      client, you must use the client's location fields. If you want to add a
      separate work location, use the fields under the heading 'Work locations'.
      <br />
      If you later (for example during a subsequent import) want to link
      additional data to the location (such as an object or contract), it is
      important to also import a location number. You must then use an identical
      number per location, to which data can be linked later.
    </p>
    <input type="checkbox" className="text-btn" />
    <h5 className="general-head mt-3">Contacts</h5>
    <p className="text">
      When importing contacts, you can choose whether the contacts belong to
      customers or to work locations. In case they belong to customers (for
      example if the contact person works for the client), you must create a
      column in your Excel file with customer numbers of the customers to which
      the contact persons should be linked.
      <br />
      If the contact persons do not directly belong to a customer, but do belong
      to a location (for example the resident of a home while the housing
      association is your customer), you create a column in your Excel file with
      location numbers of the locations to which the contact persons must be
      assigned. are linked.
      <br />
      If you want to link the contacts to customers or locations, you will first
      have to import the customers and locations, after which you import the
      contacts in step 2 and link them to the already imported customers and
      locations.
    </p>
    <input type="checkbox" className="text-btn" />
    <h5 className="general-head mt-3">Objects and sublocations</h5>
    <p className="text">
      When importing objects or sublocations, you must first import the
      addresses under which the objects or sublocations should be located in a
      separate import. When importing the locations, make sure that you import a
      unique location number per location, so that the objects or sublocations
      can be linked to it.
      <br />
      You can then import the objects or sublocations as step 2. The name and
      type fields are mandatory. If you do not indicate this, the
      objects/sublocations will not be imported. For the type, it is important
      that you have the same values ​​in the lines as were added in the
      sublocation/object types settings menu .
      <br />
      For objects and sublocations you have the option to link additional
      information fields, such as year of manufacture, serial number, brand,
      etc. You can also import the input of these fields. To be able to choose
      these fields during import, you will first have to create them in the
      Information pages settings menu . Once you have created them there, the
      fields will appear in the import menu under the heading
      'Object/sublocation information fields'.
    </p>
    <input type="checkbox" className="text-btn" />
    <h5 className="general-head mt-3">Item list</h5>
    <p className="text">
      You can also import an article list with the import function. The name
      field is mandatory. Using the 'unit' field you can indicate the unit of
      measurement of the item, for example m1, pieces, kg, pack, m2, liter, etc.
    </p>
    <div className="image-input">
      <input type="file" accept="image/*" id="imageInput" />
      <label htmlFor="imageInput" className="image-button">
        <i className="far fa-image" /> Choose image
      </label>
      <img src="" className="image-preview" />
      <span className="change-image">Choose different image</span>
    </div>
  </div>
  <div className="compan">
    <h4 className="mt-41">Import pricing tables</h4>
    <p>
      Please note: only use this if you want to import a price table for
      existing items that are linked to an item group with a price based on
      height/width.
    </p>
    <p>
      Click{" "}
      <a href="" className="here">
        here
      </a>{" "}
      to download an Excel template. Create a tab for each item for which you
      want to import a price table. Use the item code as the name for the tab.
      Then enter the prices and height/width dimensions.
    </p>
    <div className="image-input">
      <input
        type="file"
        accept="image/*"
        id="imageInput"
        onChange={handleImageChange}
      />
      <label htmlFor="imageInput" className="image-button">
        <i className="far fa-image" /> Choose image
      </label>
      {imagePreview && (
        <div>
          <img src={imagePreview} alt="Preview" className="image-preview" />
          <span className="change-image" onClick={handleImageReset}>
            Choose different image
          </span>
        </div>
      )}
    </div>
  </div>
</div>

    </div>
  </div>
</div>

    </div>
  )
}

export default Import;