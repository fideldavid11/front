import React, { useState } from 'react';

const Formulario = () => {
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
    imageFile: null
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const nacionalidades = [
    'Afgano',
    'Albanés',
    'Alemán',
    'Andorrano',
    'Angoleño',
    'Antiguano',
    'Argentina',
    'Armenio',
    'Australiano',
    'Austríaco',
    'Azerbaiyano',
    'Bahameño',
    'Bahréiní',
    'Bangladesí',
    'Barbadense',
    'Bielorruso',
    'Belga',
    'Beliceño',
    'Beninés',
    'Bhutánico',
    'Birmano',
    'Boliviano',
    'Bosnio',
    'Botsuano',
    'Brasileño',
    'Británico',
    'Brunéi',
    'Búlgaro',
    'Burkinés',
    'Burundés',
    'Butanés',
    'Cabo Verdiano',
    'Camboyano',
    'Camerunés',
    'Canadiense',
    'Chadiano',
    'Chileno',
    'Chino',
    'Chipriota',
    'Colombiano',
    'Comorense',
    'Congoleño',
    'Costarricense',
    'Croata',
    'Cubano',
    'Danés',
    'Dominicano',
    'Dominiqués',
    'Ecuatoriano',
    'Egipcio',
    'Emiratí',
    'Eritreo',
    'Escocés',
    'Eslovaco',
    'Esloveno',
    'Español',
    'Estadounidense',
    'Estonio',
    'Etíope',
    'Fiyiano',
    'Filipino',
    'Finlandés',
    'Francés',
    'Gabonés',
    'Gambiano',
    'Georgiano',
    'Ghanés',
    'Granadino',
    'Guatemalteco',
    'Guineano',
    'Guineanoecuatoriano',
    'Guineense',
    'Guyanés',
    'Haitiano',
    'Hondureño',
    'Hongkonés',
    'Húngaro',
    'Indio',
    'Indonesio',
    'Iraní',
    'Iraquí',
    'Irlandés',
    'Islandés',
    'Israelí',
    'Italiano',
    'Jamaicano',
    'Japonés',
    'Jordano',
    'Kazajo',
    'Keniano',
    'Kirguís',
    'Kiribatiano',
    'Kuwaití',
    'Laosiano',
    'Lesotense',
    'Letón',
    'Libanés',
    'Liberiano',
    'Libio',
    'Liechtensteiniano',
    'Lituano',
    'Luxemburgués',
    'Macedonio',
    'Malasio',
    'Malauí',
    'Maldivo',
    'Malgache',
    'Maliense',
    'Maltés',
    'Marfileño',
    'Marroquí',
    'Mauriciano',
    'Mauritano',
    'Mexicano',
    'Micronesio',
    'Moldavo',
    'Monegasco',
    'Mongol',
    'Montenegrino',
    'Mozambiqueño',
    'Namibio',
    'Nauruano',
    'Nepalí',
    'Neozelandés',
    'Neerlandés',
    'Nicaragüense',
    'Nigeriano',
    'Nigerino',
    'Norcoreano',
    'Noruego',
    'Omaní',
    'Pakistani',
    'Palaosiano',
    'Palestino',
    'Panameño',
    'Papú',
    'Paraguayo',
    'Peruano',
    'Polaco',
    'Portugués',
    'Qatarí',
    'Ruandés',
    'Rumano',
    'Ruso',
    'Saharaui',
    'Salomonense',
    'Salvadoreño',
    'Samoano',
    'Sancristobaleño',
    'Santalucense',
    'Santaluciano',
    'Sanmarinense',
    'Sanvicentino',
    'Santomense',
    'Saudí',
    'Senegalés',
    'Serbio',
    'Seychellense',
    'Sierraleonés',
    'Singapurense',
    'Sirio',
    'Somalí',
    'Suazi',
    'Sudafricano',
    'Sudanés',
    'Sudcoreano',
    'Sueco',
    'Suizo',
    'Surinamés',
    'Sursudanés',
    'Tailandés',
    'Taino',
    'Tanzano',
    'Tayiko',
    'Timorense',
    'Togolés',
    'Tongano',
    'Trinitense',
    'Tunecino',
    'Turco',
    'Turkmeno',
    'Tuvaluano',
    'Ucraniano',
    'Ugandés',
    'Uruguayo',
    'Uzbeko',
    'Vanuatuense',
    'Vaticano',
    'Venezolano',
    'Vietnamita',
    'Yemení',
    'Yibutiano',
    'Yugoslavo',
    'Zambiano',
    'Zimbabuense'
];

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const checkResponse = await fetch(`https://localhost:7012/api/Cedula/GetByCedulaNumber/${encodeURIComponent(formData.cedulaNumber)}`);
    const checkData = await checkResponse.json();

    if (checkData.exists) {
      setError('Ya existe un usuario registrado con esta cédula.');
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    const response = await fetch('https://localhost:7012/api/Cedula', {
      method: 'POST',
      body: formDataToSend
    });

    if (response.ok) {
      setSuccess(true);
      setFormData({
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
        imageFile: null
      });
    } else {
      const responseData = await response.json();
      setError(`Error al enviar el formulario: ${responseData}`);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    setError('Error al enviar el formulario');
  }
};


  const handleChange = (e) => {
    if (e.target.name === 'imageFile') {
      setFormData({ ...formData, foto: URL.createObjectURL(e.target.files[0]), [e.target.name]: e.target.files[0] });
    } else if (e.target.name === 'cedulaNumber') {
      const formattedCedula = e.target.value
        .replace(/\D/g, '')
        .replace(/^(\d{3})(\d{7})(\d{1})?$/, '$1-$2-$3');
      setFormData({ ...formData, [e.target.name]: formattedCedula });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
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

const handleChangeSector = (e) => {
  const selectedSector = e.target.value;
  const sector = sectores.find((sector) => sector.nombre === selectedSector);
  const municipios = sector?.municipios || [];
  setFormData({ ...formData, sector: selectedSector, municipio: '', municipios });
};


  const handleChangeMunicipio = (e) => {
    setFormData({ ...formData, municipio: e.target.value });
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8 text-center text-gray-800">Formulario de Registro</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg px-10 pt-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="cedulaNumber" className="block text-sm font-semibold text-gray-700">Cédula</label>
            <input type="text" id="cedulaNumber" name="cedulaNumber" value={formData.cedulaNumber} onChange={handleChange} required className="input-style" maxLength="13" />
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
    <option value="O-">O-</option>
    <option value="O+">O+</option>
    <option value="A-">A-</option>
    <option value="A+">A+</option>
    <option value="B-">B-</option>
    <option value="B+">B+</option>
    <option value="AB-">AB-</option>
    <option value="AB+">AB+</option>
  </select>
</div>
<div>
  <label htmlFor="estadoCivil" className="block text-sm font-semibold text-gray-700">Estado Civil</label>
  <select id="estadoCivil" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} required className="input-style">
    <option value="">Selecciona un estado civil</option>
    <option value="Soltero/a">Soltero/a</option>
    <option value="Casado/a">Casado/a</option>
    <option value="Divorciado/a">Divorciado/a</option>
    <option value="Viudo/a">Viudo/a</option>
    <option value="Unión libre">Unión libre</option>
    <option value="Separado/a">Separado/a</option>
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
            <label htmlFor="ubicacionColegio" className="block text-sm font-semibold text-gray-700">Ubicación Colegio</label>
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
          {sectores.map((sector, index) => (
            <option key={index} value={sector.nombre}>{sector.nombre}</option>
          ))}
        </select>
      </div>
    <div>
        <label htmlFor="municipio" className="block text-sm font-semibold text-gray-700">Municipio</label>
        <select id="municipio" name="municipio" value={formData.municipio} onChange={handleChangeMunicipio} required className="input-style">
          <option value="">Selecciona un municipio</option>
          {formData.municipios && formData.municipios.map((municipio, index) => (
            <option key={index} value={municipio}>{municipio}</option>
          ))}
        </select>
      </div>
      
      <div>
  <label htmlFor="foto" className="block text-sm font-semibold text-gray-700">Foto</label>
  <input type="file" id="foto" name="imageFile" onChange={handleChange} className="input-style" />
  {formData.foto && <img src={formData.foto} alt="Cédula" className="mt-2 max-w-xs" />}
</div>

        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">Formulario enviado con éxito!</p>}
        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;