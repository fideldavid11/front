import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();

  const [sectores, setSectores] = useState([
    { nombre: 'Azua', municipios: ['Azua de Compostela', 'Estebanía', 'Guayabal', 'Las Charcas', 'Las Yayas de Viajama', 'Padre Las Casas', 'Peralta', 'Pueblo Viejo', 'Sabana Yegua', 'Tábara Arriba'] },
    { nombre: 'Bahoruco', municipios: ['Neiba', 'Galván', 'Los Ríos', 'Villa Jaragua', 'Tamayo'] },
    { nombre: 'Barahona', municipios: ['Barahona', 'Cabral', 'El Peñón', 'Enriquillo', 'Fundación', 'Jaquimeyes', 'La Ciénaga', 'Las Salinas', 'Paraíso', 'Polo', 'Vicente Noble'] },
    { nombre: 'Dajabón', municipios: ['Dajabón', 'El Pino', 'Loma de Cabrera', 'Partido', 'Restauración'] },
    { nombre: 'Duarte', municipios: ['San Francisco de Macorís', 'Arenoso', 'Castillo', 'Eugenio María de Hostos', 'Las Guáranas', 'Pimentel', 'Villa Riva'] },
    { nombre: 'El Seibo', municipios: ['El Seibo', 'Miches'] },
    { nombre: 'Elías Piña', municipios: ['Comendador', 'Bánica', 'El Llano', 'Hondo Valle', 'Juan Santiago', 'Pedro Santana'] },
    { nombre: 'Espaillat', municipios: ['Moca', 'Cayetano Germosén', 'Gaspar Hernández', 'Jamao al Norte'] },
    { nombre: 'Hato Mayor', municipios: ['Hato Mayor del Rey', 'El Valle', 'Sabana de la Mar'] },
    { nombre: 'Hermanas Mirabal', municipios: ['Salcedo', 'Tenares', 'Villa Tapia'] },
    { nombre: 'Independencia', municipios: ['Jimaní', 'Cristóbal', 'Duvergé', 'La Descubierta', 'Mella', 'Postrer Río'] },
    { nombre: 'La Altagracia', municipios: ['Higüey', 'San Rafael del Yuma'] },
    { nombre: 'La Romana', municipios: ['La Romana', 'Guaymate', 'Villa Hermosa'] },
    { nombre: 'La Vega', municipios: ['La Concepción de La Vega', 'Constanza', 'Jarabacoa', 'Jima Abajo'] },
    { nombre: 'María Trinidad Sánchez', municipios: ['Nagua', 'Cabrera', 'El Factor', 'Río San Juan'] },
    { nombre: 'Monseñor Nouel', municipios: ['Bonao', 'Maimón', 'Piedra Blanca'] },
    { nombre: 'Montecristi', municipios: ['Montecristi', 'Castañuela', 'Guayubín', 'Las Matas de Santa Cruz', 'Pepillo Salcedo', 'Villa Vásquez'] },
    { nombre: 'Monte Plata', municipios: ['Monte Plata', 'Bayaguana', 'Peralvillo', 'Sabana Grande de Boyá', 'Yamasá'] },
    { nombre: 'Pedernales', municipios: ['Pedernales', 'Oviedo'] },
    { nombre: 'Peravia', municipios: ['Baní', 'Nizao'] },
    { nombre: 'Puerto Plata', municipios: ['Puerto Plata', 'Altamira', 'Guananico', 'Imbert', 'Los Hidalgos', 'Luperón', 'Sosúa', 'Villa Isabela', 'Villa Montellano'] },
    { nombre: 'Samaná', municipios: ['Samaná', 'Las Terrenas', 'Sánchez'] },
    { nombre: 'San Cristóbal', municipios: ['San Cristóbal', 'Bajos de Haina', 'Cambita Garabito', 'Los Cacaos', 'Sabana Grande de Palenque', 'San Gregorio de Nigua', 'Villa Altagracia', 'Yaguate'] },
    { nombre: 'San José de Ocoa', municipios: ['San José de Ocoa', 'Rancho Arriba', 'Sabana Larga'] },
    { nombre: 'San Juan', municipios: ['San Juan de la Maguana', 'Bohechío', 'El Cercado', 'Juan de Herrera', 'Las Matas de Farfán', 'Vallejuelo'] },
    { nombre: 'San Pedro de Macorís', municipios: ['San Pedro de Macorís', 'Consuelo', 'Guayacanes', 'Quisqueya', 'Ramón Santana', 'San José de Los Llanos'] },
    { nombre: 'Sánchez Ramírez', municipios: ['Cotuí', 'Cevicos', 'Fantino', 'La Mata'] },
    { nombre: 'Santiago', municipios: ['Santiago', 'Bisonó', 'Jánico', 'Licey al Medio', 'Puñal', 'Sabana Iglesia', 'San José de las Matas', 'Tamboril', 'Villa González'] },
    { nombre: 'Santiago Rodríguez', municipios: ['San Ignacio de Sabaneta', 'Los Almácigos', 'Monción'] },
    { nombre: 'Santo Domingo', municipios: ['Santo Domingo Este', 'Boca Chica', 'Los Alcarrizos', 'Pedro Brand', 'San Antonio de Guerra', 'Santo Domingo Norte', 'Santo Domingo Oeste'] },
    { nombre: 'Valverde', municipios: ['Mao', 'Esperanza', 'Laguna Salada'] },
  ]);


  const [formData, setFormData] = useState({
    cedulaNumber: '',
    fullName: '',
    fechaNacimiento: '',
    nacionalidad: '',
    sexo: '',
    tipoSangre: '',
    estadoCivil: '',
    ocupacion: '',
    fechaExpiracion: '',
    colegioElectoral: '',
    ubicacionColegio: '',
    direccionResidencia: '',
    sector: '',
    municipio: '',
    foto: null,
    imageFile: null,
  });

  const [originalCedula, setOriginalCedula] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7012/api/Cedula/${id}`);
        const data = await response.json();

        data.fechaNacimiento = formatDate(data.fechaNacimiento);
        data.fechaExpiracion = formatDate(data.fechaExpiracion);

        const fotoURL = `https://localhost:7012/api/Cedula/getImage/${data.foto}`;
        data.foto = fotoURL;

        const selectedSector = sectores.find((sector) => sector.nombre === data.sector);
        const municipios = selectedSector?.municipios || [];
        data.municipios = municipios;

        setFormData(data);
        setOriginalCedula(data.cedulaNumber);

      } catch (error) {
        setError('Error al obtener el registro');
      }
    };

    fetchData();
  }, [id, sectores]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [cedulaError, setCedulaError] = useState('');
  const nacionalidades = [
    'Afgano', 'Albanés', 'Alemán', 'Andorrano', 'Angoleño', 'Antiguano', 'Argentina', 'Armenio', 'Australiano', 'Austríaco', 'Azerbaiyano', 'Bahameño', 'Bahréiní', 'Bangladesí', 'Barbadense', 'Bielorruso', 'Belga', 'Beliceño', 'Beninés', 'Bhutánico', 'Birmano', 'Boliviano', 'Bosnio', 'Botsuano', 'Brasileño', 'Británico', 'Brunéi', 'Búlgaro', 'Burkinés', 'Burundés', 'Butanés', 'Cabo Verdiano', 'Camboyano', 'Camerunés', 'Canadiense', 'Chadiano', 'Chileno', 'Chino', 'Chipriota', 'Colombiano', 'Comorense', 'Congoleño', 'Costarricense', 'Croata', 'Cubano', 'Danés', 'Dominicano', 'Dominiqués', 'Ecuatoriano', 'Egipcio', 'Emiratí', 'Eritreo', 'Escocés', 'Eslovaco', 'Esloveno', 'Español', 'Estadounidense', 'Estonio', 'Etíope', 'Fiyiano', 'Filipino', 'Finlandés', 'Francés', 'Gabonés', 'Gambiano', 'Georgiano', 'Ghanés', 'Granadino', 'Guatemalteco', 'Guineano', 'Guineanoecuatoriano', 'Guineense', 'Guyanés', 'Haitiano', 'Hondureño', 'Hongkonés', 'Húngaro', 'Indio', 'Indonesio', 'Iraní', 'Iraquí', 'Irlandés', 'Islandés', 'Israelí', 'Italiano', 'Jamaicano', 'Japonés', 'Jordano', 'Kazajo', 'Keniano', 'Kirguís', 'Kiribatiano', 'Kuwaití', 'Laosiano', 'Lesotense', 'Letón', 'Libanés', 'Liberiano', 'Libio', 'Liechtensteiniano', 'Lituano', 'Luxemburgués', 'Macedonio', 'Malasio', 'Malauí', 'Maldivo', 'Malgache', 'Maliense', 'Maltés', 'Marfileño', 'Marroquí', 'Mauriciano', 'Mauritano', 'Mexicano', 'Micronesio', 'Moldavo', 'Monegasco', 'Mongol', 'Montenegrino', 'Mozambiqueño', 'Namibio', 'Nauruano', 'Nepalí', 'Neozelandés', 'Neerlandés', 'Nicaragüense', 'Nigeriano', 'Nigerino', 'Norcoreano', 'Noruego', 'Omaní', 'Pakistani', 'Palaosiano', 'Palestino', 'Panameño', 'Papú', 'Paraguayo', 'Peruano', 'Polaco', 'Portugués', 'Qatarí', 'Ruandés', 'Rumano', 'Ruso', 'Saharaui', 'Salomonense', 'Salvadoreño', 'Samoano', 'Sancristobaleño', 'Santalucense', 'Santaluciano', 'Sanmarinense', 'Sanvicentino', 'Santomense', 'Saudí', 'Senegalés', 'Serbio', 'Seychellense', 'Sierraleonés', 'Singapurense', 'Sirio', 'Somalí', 'Suazi', 'Sudafricano', 'Sudanés', 'Sudcoreano', 'Sueco', 'Suizo', 'Surinamés', 'Sursudanés', 'Tailandés', 'Taino', 'Tanzano', 'Tayiko', 'Timorense', 'Togolés', 'Tongano', 'Trinitense', 'Tunecino', 'Turco', 'Turkmeno', 'Tuvaluano', 'Ucraniano', 'Ugandés', 'Uruguayo', 'Uzbeko', 'Vanuatuense', 'Vaticano', 'Venezolano', 'Vietnamita', 'Yemení', 'Yibutiano', 'Yugoslavo', 'Zambiano', 'Zimbabuense'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          foto: reader.result,
          imageFile: file,
        }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    if (name === 'cedulaNumber' && value !== originalCedula) {
      setCedulaError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.cedulaNumber !== originalCedula) {
      try {
        const checkResponse = await fetch(`https://localhost:7012/api/Cedula/GetByCedulaNumber/${encodeURIComponent(formData.cedulaNumber)}`);
        const checkData = await checkResponse.json();

        if (checkData.exists) {
          setCedulaError('Ya existe un usuario registrado con esta cédula.');
          return;
        }
      } catch (error) {
        setError('Error al verificar la cédula.');
        return;
      }
    }

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (formData.imageFile) {
      formDataToSend.append('imageFile', formData.imageFile);
    }

    try {
      const response = await fetch(`https://localhost:7012/api/Cedula/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
      } else {
        setError('Error al actualizar el registro');
      }
    } catch (error) {
      setError('Error al actualizar el registro');
    }
  };

  const handleChangeSector = (e) => {
    const selectedSector = e.target.value;
    const sector = sectores.find((sector) => sector.nombre === selectedSector);
    const municipios = sector?.municipios || [];
    setFormData(prevData => ({ ...prevData, sector: selectedSector, municipio: '', municipios }));
  };

  const handleChangeMunicipio = (e) => {
    setFormData(prevData => ({ ...prevData, municipio: e.target.value }));
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8 text-center text-gray-800">Formulario de Edición</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg px-10 pt-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
      <label htmlFor="cedulaNumber" className="block text-sm font-semibold text-gray-700">Cédula</label>
      <input 
        type="text" 
        id="cedulaNumber" 
        name="cedulaNumber" 
        value={formData.cedulaNumber} 
        onChange={handleChange} 
        required 
        className={`input-style ${cedulaError ? 'border-red-500' : ''}`} 
        maxLength="13" 
      />
      {cedulaError && <p className="text-red-500 mt-2">{cedulaError}</p>}
    </div>
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">Nombre completo</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className="input-style" />
          </div>
          <div>
            <label htmlFor="fechaNacimiento" className="block text-sm font-semibold text-gray-700">Fecha de Nacimiento</label>
            <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required className="input-style" />
          </div>
          <div>
            <label htmlFor="nacionalidad" className="block text-sm font-semibold text-gray-700">Nacionalidad</label>
            <select id="nacionalidad" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required className="input-style">
              <option value="">Selecciona una nacionalidad</option>
              {nacionalidades.map((nacionalidad, index) => (
                <option key={index} value={nacionalidad}>{nacionalidad}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sexo" className="block text-sm font-semibold text-gray-700">Sexo</label>
            <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} required className="input-style">
              <option value="">Selecciona un sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <div>
            <label htmlFor="tipoSangre" className="block text-sm font-semibold text-gray-700">Tipo de Sangre</label>
            <select id="tipoSangre" name="tipoSangre" value={formData.tipoSangre} onChange={handleChange} required className="input-style">
              <option value="">Selecciona un tipo de sangre</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div>
            <label htmlFor="estadoCivil" className="block text-sm font-semibold text-gray-700">Estado Civil</label>
            <select id="estadoCivil" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} required className="input-style">
              <option value="">Selecciona un estado civil</option>
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Viudo">Viudo</option>
            </select>
          </div>
          <div>
  <label htmlFor="ocupacion" className="block text-sm font-semibold text-gray-700">Ocupación</label>
  <select id="ocupacion" name="ocupacion" value={formData.ocupacion} onChange={handleChange} required className="input-style">
    <option value="">Selecciona una ocupación</option>
    <option value="Estudiante">Estudiante</option>
    <option value="Empleado">Empleado</option>
    <option value="Autónomo">Autónomo</option>
    <option value="Desempleado">Desempleado</option>
  </select>
</div>

          <div>
            <label htmlFor="fechaExpiracion" className="block text-sm font-semibold text-gray-700">Fecha de Expiración</label>
            <input type="date" id="fechaExpiracion" name="fechaExpiracion" value={formData.fechaExpiracion} onChange={handleChange} required className="input-style" />
          </div>
          <div>
            <label htmlFor="colegioElectoral" className="block text-sm font-semibold text-gray-700">Colegio Electoral</label>
            <input type="text" id="colegioElectoral" name="colegioElectoral" value={formData.colegioElectoral} onChange={handleChange} required className="input-style" />
          </div>
          <div>
            <label htmlFor="ubicacionColegio" className="block text-sm font-semibold text-gray-700">Ubicación del Colegio Electoral</label>
            <input type="text" id="ubicacionColegio" name="ubicacionColegio" value={formData.ubicacionColegio} onChange={handleChange} required className="input-style" />
          </div>
          <div>
            <label htmlFor="direccionResidencia" className="block text-sm font-semibold text-gray-700">Dirección de Residencia</label>
            <input type="text" id="direccionResidencia" name="direccionResidencia" value={formData.direccionResidencia} onChange={handleChange} required className="input-style" />
          </div>
          <div>
            <label htmlFor="sector" className="block text-sm font-semibold text-gray-700">Sector</label>
            <select id="sector" name="sector" value={formData.sector} onChange={handleChangeSector} required className="input-style">
              <option value="">Selecciona un sector</option>
              {sectores.map((sector) => (
                <option key={sector.nombre} value={sector.nombre}>{sector.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="municipio" className="block text-sm font-semibold text-gray-700">Municipio</label>
           <select id="municipio" name="municipio" value={formData.municipio} onChange={handleChangeMunicipio} required className="input-style">
  <option value="">Selecciona un municipio</option>
  {formData.municipios ? formData.municipios.map((municipio) => (
    <option key={municipio} value={municipio}>{municipio}</option>
  )) : null}
</select>

          </div>
          <div>
      <label htmlFor="imageFile" className="block text-sm font-semibold text-gray-700">Actualizar Foto</label>
      <input type="file" id="imageFile" name="imageFile" onChange={handleChange} className="input-style" />
      {formData.foto && <img src={formData.foto} alt="Cédula" className="mt-2" />}
    </div>
        </div>
        <button type="submit" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Actualizar</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    {success && <p className="text-green-500 mt-4">Registro actualizado correctamente.</p>}
    </div>
  );
};

export default Edit;
