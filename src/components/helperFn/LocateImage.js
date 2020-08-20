import Images from '../ImagesModule';

function LocateImage(pokemonImageName){
    switch(pokemonImageName){
        case 'Charizard':
            return Images.Charizard;
        case 'Charmander':
            return Images.Charmander;
        case 'Mewtwo':
            return Images.Mewtwo;
        default:
            return Images.Pikachu;
    }
}

export default LocateImage;