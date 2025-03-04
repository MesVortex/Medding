package org.filrouge.medding.entities.enums;

import lombok.Getter;

@Getter
public enum WeddingServiceCategory {
    VENUE_AND_DECORATION("Venue & Decoration"),
    ATTIRE_AND_BEAUTY("Traditional Wedding Attire & Beauty"),
    CATERING_AND_SWEETS("Catering & Sweets"),
    ENTERTAINMENT_AND_MUSIC("Entertainment & Music"),
    PHOTOGRAPHY_AND_VIDEOGRAPHY("Photography & Videography"),
    TRANSPORTATION_AND_LOGISTICS("Transportation & Logistics"),
    WEDDING_FAVORS_AND_GIFTS("Wedding Favors & Gifts");

    private final String displayName;

    WeddingServiceCategory(String displayName) {
        this.displayName = displayName;
    }

}
